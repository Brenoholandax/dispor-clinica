import streamlit as st
import pandas as pd
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# 1. Configurações Iniciais
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

st.set_page_config(page_title="Central do Filho - Clínica TEA", layout="wide")

# 2. Simulação de Login (Para o MVP)
# No futuro, usaremos o ID do pai que logou via WhatsApp
RESPONSAVEL_ID = '22222222-2222-2222-2222-222222222222'

def buscar_dados():
    # Busca dados da criança vinculada ao pai
    paciente = supabase.table("pacientes").select("*").eq("responsavel_id", RESPONSAVEL_ID).single().execute()
    
    # Busca as sessões dessa criança
    sessoes = supabase.table("sessoes_diarias").select("*").eq("paciente_id", paciente.data['id']).order('data_hora_entrada').execute()
    
    return paciente.data, pd.DataFrame(sessoes.data)

paciente_info, df_sessoes = buscar_dados()

# 3. Interface Visual
st.title(f"💙 Central do {paciente_info['nome_completo']}")
st.markdown("---")

# Linha 1: Métricas Principais
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Sessões Realizadas (Mês)", len(df_sessoes))
    st.caption("Contrato: 8 sessões/mês")

with col2:
    # Simulação financeira - Em breve leremos da tabela 'pagamentos'
    st.success("Mensalidade: PAGA")
    st.caption("Vencimento: Dia 10")

with col3:
    ultimo_humor = df_sessoes['humor_chegada'].iloc[-1] if not df_sessoes.empty else "N/A"
    st.metric("Último Estado", ultimo_humor)

# Linha 2: Gráfico de Evolução e Relatório
st.markdown("### 📈 Evolução do Comportamento")
col_grafico, col_relatorio = st.columns([2, 1])

with col_grafico:
    if not df_sessoes.empty:
        # Mapeando humor para números para o gráfico
        humor_map = {"Desregulado": 1, "Ansioso": 2, "Agitado": 3, "Calmo": 4}
        df_sessoes['humor_num'] = df_sessoes['humor_chegada'].map(humor_map)
        st.line_chart(df_sessoes.set_index('data_hora_entrada')['humor_num'])
    else:
        st.info("Aguardando primeiras sessões para gerar gráficos.")

with col_relatorio:
    st.markdown("### 📝 Último Recado")
    if not df_sessoes.empty:
        ultima_obs = df_sessoes['observacao_transicao'].iloc[-1]
        st.info(f"\"{ultima_obs}\"")
    else:
        st.write("Sem observações recentes.")

# Linha 3: Área Financeira
st.markdown("---")
st.markdown("### 💳 Financeiro e Documentos")
with st.expander("Ver Histórico de Pagamentos"):
    st.write("Janeiro/2026 - Pago ✅")
    st.write("Dezembro/2025 - Pago ✅")