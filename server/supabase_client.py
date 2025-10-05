import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Crea el cliente de Supabase que puedes importar en otros archivos
supabase: Client = create_client(url, key)
