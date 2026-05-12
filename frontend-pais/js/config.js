// frontend-pais/js/config.js
const CONFIG = {
    // Detecta se estamos rodando localmente ou em produção
    API_BASE_URL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:8000"
        : "https://api.suaclinica.com", // Substitua pelo domínio real de produção do backend
    
    // A chave de API pública/acesso (NÃO COLOQUE CHAVES SECRETAS AQUI)
    // Esta chave deve ser a mesma configurada no backend como API_KEY_SECRET para permitir a conexão inicial.
    // Em um cenário ideal, seria usado um token JWT após o login.
    API_KEY: "dev-secret-key-123" 
};