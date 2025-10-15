from flask import request, jsonify
from supabase_client import supabase
from config import FEATURES_CONFIG
from services.tf_serving_service import predict_fromcsv

table_name = "Model_Register"
bucket_name = "csv_files"

def first_prediction(model_type: str):
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
        predictions_list = None
        obj = predict_fromcsv(file, model_type)
        if obj["error"]:
            return jsonify({
                "error": obj["error"] 
            })
        predictions_list = obj["predictions"]
        print("Enviando respuesta final al cliente...")

        file.seek(0)

        file_path_in_bucket = f"{model_type}/{file.filename}"

        supabase.storage.from_(bucket_name).upload(
            file=file.read(),
            path=file_path_in_bucket,
            file_options={"content-type": file.content_type}
        )

        res = supabase.storage.from_(bucket_name).get_public_url(file_path_in_bucket)
        pub_url = res


        supabase.table(table_name).insert({
            'model_type': model_type,
            'file_name': file.filename,
            'url': pub_url
        }).execute()

        return jsonify({
            "success": True,
            "model_type": model_type,
            "predictions_count": len(predictions_list),
            "predictions": predictions_list
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Error interno al procesar el archivo: {str(e)}"}), 500

