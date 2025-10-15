import pandas as pd
import pickle
import numpy as np
import requests
from config import FEATURES_CONFIG, MODELS_CONFIG

scaler = None

try:
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    print("Scaler 'scaler.pkl' loaded successfully.")
except FileNotFoundError:
    scaler = None
    print("ERROR: 'scaler.pkl' not found. Predictions will not be scaled.")

def predict_fromcsv(file, model_type: str):
    df = pd.read_csv(file)
    features = FEATURES_CONFIG[model_type]
    missing_cols = [col for col in features if col not in df.columns]
    if missing_cols:
        return {"error": f"Columnas faltantes en el CSV: {', '.join(missing_cols)}"}

    processed_data = None
    df_features = df[features]
    if model_type == 'K2':
        print(f"Procesando para el modelo '{model_type}', se aplicará el scaler.")
        if scaler is None:
            return {
                "error": "El archivo 'scaler.pkl' es necesario para el modelo K2, pero no se encontró."
            }
        processed_data = scaler.transform(df_features)
    else:
        print(f"Procesando para el modelo '{model_type}', no se aplicará scaler.")
        processed_data = df_features.values

    X_tensor_reshaped = processed_data.reshape(processed_data.shape[0], processed_data.shape[1], 1)

    input_array = np.array(X_tensor_reshaped, dtype=np.float32)
    url = MODELS_CONFIG.get(model_type)
    payload = {"instances": input_array.tolist()}
    response = requests.post(url, json=payload)

    response.raise_for_status()

    result = response.json()
    predictions = result.get('predictions', [])
    predictions_list = [item for sublist in predictions for item in sublist]

    return {"predictions": predictions_list, "error": None}
