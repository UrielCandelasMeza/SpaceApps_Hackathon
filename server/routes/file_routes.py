from flask import Blueprint, request, jsonify
import pandas as pd
import numpy as np
import requests
#import tensorflow as tf
import pickle
from config import FEATURES_CONFIG, MODELS_CONFIG

file_bp = Blueprint('file_bp', __name__)

# Guardamos los modelos cargados en memoria para no tener que leerlos del disco en cada petición.
# loaded_models = {}
#
# def get_model(model_type: str):
#     if model_type not in loaded_models:
#         print(f">>>Cargando modelo para '{model_type}' por primera vez...")
#         model_path = MODELS_CONFIG.get(model_type)
#         if not model_path:
#             raise ValueError(f"No se encontró una ruta de modelo para el tipo: {model_type}")
#         loaded_models[model_type] = tf.keras.models.load_model(model_path)
#         print(f">>>Modelo '{model_type}' cargado en memoria.")
#     return loaded_models[model_type]
try:
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    print("Scaler 'scaler.pkl' loaded successfully.")
except FileNotFoundError:
    scaler = None
    print("ERROR: 'scaler.pkl' not found. Predictions will not be scaled.")

@file_bp.route('/csv/<string:model_type>', methods=['POST'])
def manage_data(model_type: str):
    if model_type not in FEATURES_CONFIG:
        return jsonify(
            {"error": f"Tipo de modelo no válido: '{model_type}'. Válidos: {list(FEATURES_CONFIG.keys())}"}
        ), 400

    if 'csvFile' not in request.files:
        return jsonify(
            {"error": "No se ha subido ningún archivo. Asegúrate de usar la clave 'csvFile'."}
        ), 400

    file = request.files['csvFile']

    if file.filename == '' or not file.filename.endswith('.csv'):
        return jsonify({"error": "El archivo no es un CSV válido."}), 400

    try:
        df = pd.read_csv(file)
        
        features = FEATURES_CONFIG[model_type]
        
        missing_cols = [col for col in features if col not in df.columns]
        if missing_cols:
            return jsonify(
                {"error": f"Columnas faltantes en el CSV: {', '.join(missing_cols)}"}
            ), 400

        processed_data = None # 💡 1. Variable para guardar los datos procesados

        df_features = df[features]
        if model_type == 'K2':
            print(f"Procesando para el modelo '{model_type}', se aplicará el scaler.")
            # Si el modelo es K2, verificamos que el scaler se haya cargado
            if scaler is None:
                return jsonify(
                    {"error": "El archivo 'scaler.pkl' es necesario para el modelo K2, pero no se encontró."}
                ), 500
            
            # Aplicamos el scaler
            processed_data = scaler.transform(df_features)
        else:
            # Para cualquier otro modelo, usamos los datos tal cual
            print(f"Procesando para el modelo '{model_type}', no se aplicará scaler.")
            processed_data = df_features.values

        
        X_tensor_reshaped = processed_data.reshape(processed_data.shape[0], processed_data.shape[1], 1)

        input_array = np.array(X_tensor_reshaped, dtype=np.float32)
        #print(input_array[0].tolist())
        #model = get_model(model_type)
        #predictions = model.predict(input_array)
        url = MODELS_CONFIG.get(model_type)
        #url = f"http://localhost:8501/v1/models/{model_type}_model:predict"
        payload = {"instances": input_array.tolist()}
        response = requests.post(url, json=payload)


        response.raise_for_status()
        result = response.json()
        predictions = result.get('predictions', [])
        predictions_list = [item for sublist in predictions for item in sublist]

        print("Enviando respuesta final al cliente...")
        return jsonify({
            "success": True,
            "model_type": model_type,
            "predictions_count": len(predictions_list),
            "predictions": predictions_list
        })
        # predictions_list = predictions.flatten().tolist()
        #
        # # 6. Devolver el resultado
        # return jsonify({
        #     "success": True,
        #     "model_type": model_type,
        #     "predictions_count": len(predictions_list),
        #     "predictions": predictions_list
        # })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Error interno al procesar el archivo: {str(e)}"}), 500
