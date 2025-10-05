from flask import Blueprint, request, jsonify
import pandas as pd
#import numpy as np
import tensorflow as tf
from config import FEATURES_CONFIG, MODELS_CONFIG

# Blueprint es el equivalente de Router en Express
file_bp = Blueprint('file_bp', __name__)

# --- Optimización: Cache para los modelos ---
# Guardamos los modelos cargados en memoria para no tener que leerlos del disco en cada petición.
loaded_models = {}

def get_model(model_type: str):
    """Carga un modelo desde el disco o lo devuelve desde el cache si ya está cargado."""
    if model_type not in loaded_models:
        print(f"🧠 Cargando modelo para '{model_type}' por primera vez...")
        model_path = MODELS_CONFIG.get(model_type)
        if not model_path:
            raise ValueError(f"No se encontró una ruta de modelo para el tipo: {model_type}")
        loaded_models[model_type] = tf.keras.models.load_model(model_path)
        print(f"✅ Modelo '{model_type}' cargado en memoria.")
    return loaded_models[model_type]

@file_bp.route('/csv/<string:model_type>', methods=['POST'])
def manage_data(model_type: str):
    """
    Ruta para subir un archivo CSV, procesarlo y devolver predicciones.
    El <string:model_type> en la URL se pasa como argumento a la función.
    """
    # 1. Validar el tipo de modelo
    if model_type not in FEATURES_CONFIG:
        return jsonify({"error": f"Tipo de modelo no válido: '{model_type}'. Válidos: {list(FEATURES_CONFIG.keys())}"}), 400

    # 2. Validar la subida del archivo
    if 'csvFile' not in request.files: return jsonify({"error": "No se ha subido ningún archivo. Asegúrate de usar la clave 'csvFile'."}), 400

    file = request.files['csvFile']

    if file.filename == '' or not file.filename.endswith('.csv'):
        return jsonify({"error": "El archivo no es un CSV válido."}), 400

    try:
        # 3. Procesar el CSV con Pandas
        # Pandas puede leer directamente el buffer del archivo en memoria
        df = pd.read_csv(file)
        
        # 4. Preparar los datos para el modelo
        features = FEATURES_CONFIG[model_type]
        
        # Verificar que todas las columnas necesarias existan
        missing_cols = [col for col in features if col not in df.columns]
        if missing_cols:
            return jsonify({"error": f"Columnas faltantes en el CSV: {', '.join(missing_cols)}"}), 400

        # Seleccionar y convertir los datos a un array de NumPy
        df_features = df[features].values
        
        # Darle la forma 3D que espera la capa Conv1D: [muestras, pasos, características_por_paso]
        # Para nosotros: [número_de_filas, número_de_features, 1]
        X_tensor_reshaped = df_features.reshape(df_features.shape[0], df_features.shape[1], 1)

        # 5. Cargar el modelo y predecir
        model = get_model(model_type)
        predictions = model.predict(X_tensor_reshaped)

        # Aplanar el array de predicciones para que sea una lista simple
        predictions_list = predictions.flatten().tolist()
        
        # 6. Devolver el resultado
        return jsonify({
            "success": True,
            "model_type": model_type,
            "predictions_count": len(predictions_list),
            "predictions": predictions_list
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Error interno al procesar el archivo: {str(e)}"}), 500
