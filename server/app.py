import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Importar los Blueprints (Routers)
from routes.file_routes import file_bp
from routes.history_routes import history_bp
# from supabase_client import supabase # Puedes importarlo aquí si lo usas en alguna ruta

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Crear la aplicación Flask
app = Flask(__name__)

# Configurar CORS para permitir peticiones desde cualquier origen
CORS(app)

# Registrar los Blueprints con un prefijo de URL
app.register_blueprint(file_bp, url_prefix='/api')
app.register_blueprint(history_bp, url_prefix='/api')

# Ruta raíz de bienvenida
@app.route('/')
def index():
    return "<h1>Backend de Flask para Predicciones de Planetas funcionando!</h1>"

if __name__ == '__main__':
    # Obtener el puerto desde las variables de entorno, con 5000 como valor por defecto
    port = int(os.environ.get("PORT", 5000))
    # El debug=True es útil para desarrollo, ya que recarga el servidor automáticamente
    app.run(host='0.0.0.0', port=port, debug=os.environ.get("FLASK_DEBUG", 'False').lower() == 'true')
