import streamlit as st
import pandas as pd
from supabase import create_client, Client
import os
from dotenv import load_dotenv
import requests

# Configurações Iniciais
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

st.set_page_config(page_title="Portal da Clínica - TEA", page_icon="🏥", layout="wide")

# Simulação da Clínica Logada
CLINICA_ID = '11111111-1111-1111-1111-111111111111'

# Buscar os pacientes cadastrados nesta clínica
@st.cache_data(ttl=10) # Atualiza a lista a cada 10s
def buscar_pacientes():
    resposta = supabase.table("pacientes").select("*").eq("clinica_id", CLINICA_ID).execute()
    return {p['nome_completo']: p['id'] for p in resposta.data}

pacientes_dict = buscar_pacientes()

# --- MENU LATERAL ---
st.sidebar.title("🏥 Portal Multidisciplinar")
st.sidebar.markdown("---")
menu = st.sidebar.radio("Navegação", [
    "📝 Relatórios de Sessão", 
    "➕ Novo Cadastro", 
    "📊 Painel Geral (Em breve)"
])

# ==========================================
# TELA 1: FORMULÁRIOS DE SESSÃO (TERAPEUTAS)
# ==========================================
if menu == "📝 Relatórios de Sessão":
    st.title("Registrar Evolução Diária")
    st.write("Selecione a especialidade e o paciente para preencher o relatório.")
    
    # As especialidades baseadas no seu Looker Studio
    especialidades = [
        "Relatório ABA", 
        "Fisioterapia Motora", 
        "Relatório Fonoaudiológica", 
        "Relatório Terapia Ocupacional", 
        "Relatório Psicopedagogia", 
        "Relatório TCC", 
        "Relatório Musicoterapia", 
        "Portage"
    ]
    
    col1, col2 = st.columns(2)
    with col1:
        especialidade_selecionada = st.selectbox("Qual é a sua Especialidade?", especialidades)
    with col2:
        if pacientes_dict:
            paciente_selecionado = st.selectbox("Selecione o Paciente", list(pacientes_dict.keys()))
            id_do_paciente = pacientes_dict[paciente_selecionado]
        else:
            st.warning("Nenhum paciente cadastrado.")
            id_do_paciente = None
            
    st.markdown("---")
    
    if id_do_paciente:
        st.subheader(f"Formulário: {especialidade_selecionada}")
        with st.form("form_sessao"):
            # Campos comuns a todas as terapias
            humor = st.select_slider(
                "Humor/Regulação na sessão de hoje:", 
                options=["Desregulado", "Ansioso", "Calmo", "Muito Engajado", "Excelente"]
            )
            atividades = st.text_area("Atividades e Objetivos Trabalhados")
            observacao = st.text_area("Recado para os Pais (Aparecerá no aplicativo deles)")
            
            submit = st.form_submit_button("Salvar Sessão e Notificar Pais", type="primary")
            

            if submit:
                # Em vez de salvar direto no banco, enviamos para a NOSSA API
                payload = {
                    "clinica_id": CLINICA_ID,
                    "paciente_id": id_do_paciente,
                    "humor_saida": humor,
                    "atividades_realizadas": especialidade_selecionada + " - " + atividades,
                    "observacao_final": observacao
                }
                
                # Fazendo a requisição (POST) para o nosso backend FastAPI
                url_api = "http://127.0.0.1:8000/registrar-saida"
                
                try:
                    resposta = requests.post(url_api, json=payload)
                    
                    if resposta.status_code == 200:
                        st.success(f"✅ Relatório de {especialidade_selecionada} salvo!")
                        st.info("A notificação de WhatsApp foi engatilhada pelo servidor.")
                    else:
                        st.error(f"Erro na API: {resposta.text}")
                except Exception as e:
                    st.error(f"Erro de conexão com o motor FastAPI. O servidor está rodando? Erro: {e}")
# ==========================================
# TELA 2: CADASTRAR NOVO PACIENTE (RECEPÇÃO)
# ==========================================
elif menu == "➕ Novo Cadastro":
    st.title("Cadastrar Novo Paciente")
    
    with st.container():
        st.markdown("#### 1. Dados do Responsável (Financeiro/App)")
        nome_pai = st.text_input("Nome do Pai/Mãe/Responsável")
        whatsapp = st.text_input("WhatsApp (Para receber os relatórios)")
        
        st.markdown("#### 2. Dados da Criança")
        nome_crianca = st.text_input("Nome Completo da Criança")
        data_nasc = st.date_input("Data de Nascimento", format="DD/MM/YYYY")
        
        if st.button("Salvar Cadastro", type="primary"):
            if nome_pai and whatsapp and nome_crianca:
                # 1. Salva Responsavel
                resp_inserido = supabase.table("responsaveis").insert({
                    "clinica_id": CLINICA_ID,
                    "nome": nome_pai,
                    "telefone_whatsapp": whatsapp,
                    "pin_acesso": "1234" # Senha padrão inicial
                }).execute()
                
                id_novo_responsavel = resp_inserido.data[0]['id']
                
                # 2. Salva Criança
                supabase.table("pacientes").insert({
                    "clinica_id": CLINICA_ID,
                    "responsavel_id": id_novo_responsavel,
                    "nome_completo": nome_crianca,
                    "data_nascimento": data_nasc.isoformat()
                }).execute()
                
                st.success("Paciente cadastrado com sucesso! Ele já aparecerá na lista de terapias.")
            else:
                st.error("Preencha todos os campos para cadastrar.")