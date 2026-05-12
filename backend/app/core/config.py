# backend/app/core/config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "API Clínica TEA - Transparência para Pais"
    SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.environ.get("SUPABASE_KEY", "")
    GEMINI_API_KEY: str = os.environ.get("GEMINI_API_KEY", "")
    API_KEY_SECRET: str = os.environ.get("API_KEY_SECRET", "dev-secret-key-123") # Deve ser mudado em produção

    # Configuração de CORS - Defina seus domínios de produção aqui
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:5500",      # Live Server local (Front Pais)
        "http://127.0.0.1:5500",
        "http://localhost:8501",      # Streamlit local
        "http://127.0.0.1:8501",
        "https://seu-site-pais.com",  # Domínio de produção frontend pais
        "https://seu-painel.com"      # Domínio de produção frontend clinica
    ]

settings = Settings()