const CONFIG = {
    API_BASE_URL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:8000"
        : "https://api.suaclinica.com",
    API_KEY: "dev-secret-key-123"
};
