import requests
import pandas as pd
from flask import jsonify
from supabase_client import supabase
from services.tf_serving_service import predict_fromcsv
from io import StringIO
from config import SUPABASE_KEY
table_name = "Model_Register"

def get_registers():
    try:
        res = supabase.table(table_name).select("*").execute()
        
        return jsonify({
            "success": True,
            "elements": res.data,
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Error interno al procesar el archivo: {str(e)}"}), 500
def get_unique(id: str):
    if not id:
        return jsonify({
            "success": False,
            "error": "No ingreso ningun id"
        })

    res = supabase.table(table_name).select("*").eq("id",id).execute()
    data = res.data[0]
    url = data["url"]

    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    csv_data = StringIO(response.text)
    obj = predict_fromcsv(csv_data, data["model_type"])

    if obj["error"]:
        return jsonify({
            "error": obj["error"] 
        })
    predictions_list = obj["predictions"]

    return jsonify({
        "success": True,
        "model_type": data["model_type"],
        "predictions_count": len(predictions_list),
        "predictions": predictions_list
    })
