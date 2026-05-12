# 🏥 Clínica TEA - Sistema de Transparência e Evolução

Este é um monorepo de um sistema completo voltado para clínicas de autismo, permitindo a comunicação humanizada entre terapeutas e pais através de Inteligência Artificial e painéis interativos.

---

## 🚀 Visão Geral do Sistema

O projeto é dividido em três camadas principais:
1.  **Backend (FastAPI):** O "cérebro" que processa dados, integra com o Supabase e utiliza o Google Gemini para humanizar relatórios técnicos.
2.  **Portal da Clínica (Streamlit):** Interface administrativa para terapeutas registrarem sessões e cadastros.
3.  **Painel da Família (HTML/JS/CSS):** Interface web para pais acompanharem a evolução, relatórios e pagamentos em tempo real.

---

## 🛠️ Tecnologias Utilizadas

-   **Backend:** Python 3.11+, FastAPI, Pydantic, Uvicorn.
-   **IA:** Google Gemini 2.5 Flash (via SDK `google-genai`).
-   **Banco de Dados:** Supabase (PostgreSQL + Auth).
-   **Frontend Admin:** Streamlit.
-   **Frontend Pais:** HTML5, CSS3, JavaScript Vanilla, Chart.js.
-   **Infraestrutura:** Docker & Docker Compose.

---

## 📂 Estrutura de Pastas

```text
api-clinica-tea/
├── backend/                # API REST de alto desempenho
│   ├── app/                # Código fonte da aplicação
│   │   ├── core/           # Configurações, Segurança e CORS
│   │   └── main.py         # Entrypoint da API
│   ├── tests/              # Testes automatizados
│   ├── .env.example        # Modelo de variáveis de ambiente
│   └── Dockerfile          # Configuração para deploy em container
├── frontend-pais/          # Dashboard do cliente (Pais)
│   ├── js/
│   │   ├── config.js       # Configurações dinâmicas de URL (Dev/Prod)
│   │   └── script.js       # Consumo da API via Fetch
│   └── index.html          # Tela de login/dashboard
├── frontend-clinica/       # Portal Administrativo
│   └── dashboard_clinica.py
└── docker-compose.yml      # Orquestração local de todos os serviços
```

---

## 🔧 Configuração e Instalação

### 1. Requisitos Próximos
-   Python 3.11 ou superior.
-   Chave de API do [Google AI Studio](https://aistudio.google.com/).
-   Projeto configurado no [Supabase](https://supabase.com/).

### 2. Variáveis de Ambiente
Crie um arquivo `.env` dentro da pasta `backend/` seguindo o modelo do `.env.example`:

```env
SUPABASE_URL=seu_link_do_supabase
SUPABASE_KEY=sua_chave_anon_ou_service_role
GEMINI_API_KEY=sua_chave_do_google_gemini
API_KEY_SECRET=crie_uma_chave_segura_aqui
```

### 3. Rodando o Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
A API estará disponível em: `http://127.0.0.1:8000`

### 4. Rodando o Portal da Clínica (Streamlit)
```bash
cd frontend-clinica
pip install -r ../backend/requirements.txt
streamlit run dashboard_clinica.py
```

### 5. Rodando o Painel dos Pais
Basta abrir o arquivo `frontend-pais/index.html` em qualquer navegador ou usar o comando `python -m http.server 5500` dentro da pasta.

---

## 🔐 Segurança e Integração

-   **X-API-Key:** Todas as rotas críticas exigem o header `X-API-Key` validado contra a `API_KEY_SECRET` do servidor.
-   **CORS:** O backend está configurado para aceitar requisições apenas de domínios confiáveis (configuráveis em `app/core/config.py`).
-   **Configuração Dinâmica:** O frontend utiliza o `js/config.js` para detectar se está rodando localmente ou em produção, alterando a URL da API automaticamente.

---

## 🚢 Deploy (Produção)

Este projeto está pronto para deploy em containers:

1.  **Backend:** Use o `Dockerfile` em serviços como Render, Railway ou Google Cloud Run.
2.  **Frontends Estáticos:** O `frontend-pais` pode ser hospedado na Vercel, Netlify ou AWS S3.
3.  **Orquestração:** O arquivo `docker-compose.yml` permite rodar todo o ecossistema localmente com:
    ```bash
    docker-compose up -d --build
    ```

---

## 📝 Licença
Este projeto é privado e destinado ao uso interno da Clínica TEA.

---

**Desenvolvido com 💙 para transformar a jornada do autismo.**
