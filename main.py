import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

# Carrega as chaves do arquivo .env
load_dotenv()

# Inicializa a API
app = FastAPI(title="API Clínica TEA - Transparência para Pais")

# Conecta ao Supabase
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Credenciais do Supabase não encontradas no arquivo .env")

supabase: Client = create_client(url, key)


# Define o formato dos dados que a API vai receber do site
class RegistroSessao(BaseModel):
    clinica_id: str
    paciente_id: str
    humor_chegada: str
    energia_chegada: str
    observacao_transicao: str

# Rota principal de teste
@app.get("/")
def home():
    return {"mensagem": "API da Clínica TEA está rodando com sucesso!"}

# Rota para o terapeuta registrar a chegada da criança
@app.post("/registrar-entrada")
def registrar_entrada(registro: RegistroSessao):
    try:
        # Tenta inserir os dados na tabela do Supabase
        resposta = supabase.table("sessoes_diarias").insert({
            "clinica_id": registro.clinica_id,
            "paciente_id": registro.paciente_id,
            "humor_chegada": registro.humor_chegada,
            "energia_chegada": registro.energia_chegada,
            "observacao_transicao": registro.observacao_transicao
        }).execute()
        
        return {
            "status": "sucesso", 
            "mensagem": "Entrada registrada no banco de dados.",
            "dados": resposta.data
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar no banco: {str(e)}")