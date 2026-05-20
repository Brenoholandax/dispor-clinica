/**
 * Exibe uma notificação toast na tela.
 * @param {string} mensagem - Texto a exibir
 * @param {string} tema - 'verde' (padrão, portal pais/clinica) ou 'azul' (portal adm)
 */
function mostrarToast(mensagem, tema = 'verde') {
    const cor = tema === 'azul' ? '#1e40af' : '#53a587';
    const icone = tema === 'azul' ? 'fa-circle-check' : 'fa-square-check';

    const oldToast = document.querySelector('.toast-simple');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-simple';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-left: 5px solid ${cor};
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: toastSlideIn 0.3s ease;
        font-family: inherit;
        font-size: 15px;
        font-weight: 500;
        color: #1e293b;
    `;
    toast.innerHTML = `<i class="fa-solid ${icone}" style="color: ${cor};"></i> ${mensagem}`;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

// Injeta a animação uma única vez no documento
(function injetarAnimacaoToast() {
    if (document.getElementById('toast-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'toast-keyframes';
    style.innerHTML = `
        @keyframes toastSlideIn {
            from { transform: translateX(110%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
        }
    `;
    document.head.appendChild(style);
})();
