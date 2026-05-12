# backend/app/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from google import genai
from app.core.config import settings
from app.core.security import get_api_key

app = FastAPI(title=settings.PROJECT_NAME)

# --- CONFIGURAÇÃO DE SEGURANÇA (CORS) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração Supabase
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Configuração Gemini
ai_client = genai.Client(api_key=settings.GEMINI_API_KEY)

# --- MODELOS DE DADOS ---
class RegistroSessao(BaseModel):
    clinica_id: str
    paciente_id: str
    humor_chegada: str
    energia_chegada: str
    observacao_transicao: str

class ResumoSessao(BaseModel):
    clinica_id: str
    paciente_id: str
    humor_saida: str
    atividades_realizadas: str
    observacao_final: str

# --- ROTAS ---
@app.get("/")
def home():
    return {"mensagem": "API da Clínica TEA rodando segura!"}

@app.post("/registrar-entrada", dependencies=[Depends(get_api_key)])
def registrar_entrada(registro: RegistroSessao):
    try:
        resposta = supabase.table("sessoes_diarias").insert({
            "clinica_id": registro.clinica_id,
            "paciente_id": registro.paciente_id,
            "humor_chegada": registro.humor_chegada,
            "energia_chegada": registro.energia_chegada,
            "observacao_transicao": registro.observacao_transicao
        }).execute()
        return {"status": "sucesso", "dados": resposta.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro: {str(e)}")

@app.post("/registrar-saida", dependencies=[Depends(get_api_key)])
def registrar_saida(resumo: ResumoSessao):
    try:
        prompt_ia = f"""
        Você é a assistente de comunicação de uma clínica de autismo.
        Sua tarefa é ler as anotações técnicas do terapeuta e escrever uma mensagem curta, acolhedora e empática para os pais.
        
        Dados brutos da sessão:
        - O paciente saiu da clínica: {resumo.humor_saida}
        - Atividades feitas: {resumo.atividades_realizadas}
        - Nota do terapeuta: {resumo.observacao_final}
        
        Regras para a mensagem:
        - Comece sempre com "Olá, família! 💙"
        - Remova jargões muito complexos e explique de forma gentil.
        - Escreva no máximo dois parágrafos curtos, ideais para o WhatsApp.
        """
        
        resposta_ia = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt_ia
        )
        texto_humanizado = resposta_ia.text
        
        link_dashboard = f"https://seu-site-pais.com/painel?paciente={resumo.paciente_id}"
        mensagem_final = f"{texto_humanizado}\n\n📊 Acompanhe a evolução no painel: {link_dashboard}"
        
        print("--- DISPARO DE WHATSAPP COM IA ---")
        print(mensagem_final)
        print("------------------------------------")
        
        return {"status": "sucesso", "mensagem": "Resumo processado com IA com sucesso."}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro: {str(e)}")
    
@app.get("/buscar-relatorios/{paciente_id}", dependencies=[Depends(get_api_key)])
def buscar_relatorios(paciente_id: str):
    try:
        resposta = supabase.table("sessoes_diarias").select("*").eq("paciente_id", paciente_id).execute()
        return {"status": "sucesso", "dados": resposta.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar: {str(e)}")