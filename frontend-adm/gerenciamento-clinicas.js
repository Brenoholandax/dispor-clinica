function openModal() {
    document.getElementById('clinicModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('clinicModal').style.display = 'none';
}

// Fecha o modal se clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('clinicModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Lógica de Sidebar (reutilizada e adaptada do script.js)
function close_bars() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-closed");
}

function logout() {
    window.location.href = "index.html";
}

// Mock de dados das clínicas
const clinicas = [
    { id: 1, nome: "Clínica TEA Vida", cnpj: "12.345.678/0001-90", status: "Ativa", acessos: 15 },
    { id: 2, nome: "Centro de Apoio Azul", cnpj: "98.765.432/0001-10", status: "Ativa", acessos: 8 },
    { id: 3, nome: "Espaço Estimular", cnpj: "45.678.901/0001-22", status: "Inativa", acessos: 0 }
];

function carregarClinicas() {
    const tbody = document.getElementById('clinicasTableBody');
    tbody.innerHTML = '';

    clinicas.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.cnpj}</td>
            <td><span class="status-badge ${c.status === 'Ativa' ? 'status-active' : 'status-inactive'}">${c.status}</span></td>
            <td>${c.acessos} usuários</td>
            <td class="actions-btns">
                <button class="btn-icon" title="Gerenciar Acessos" onclick="gerenciarAcessos(${c.id})"><i class="fa-solid fa-users-gear"></i></button>
                <button class="btn-icon" title="Editar" onclick="editarClinica(${c.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-icon" title="Excluir" onclick="excluirClinica(${c.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarClinica(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nomeClinica').value;
    const cnpj = document.getElementById('cnpjClinica').value;
    const status = document.getElementById('statusClinica').value;

    const novaClinica = {
        id: clinicas.length + 1,
        nome: nome,
        cnpj: cnpj,
        status: status,
        acessos: 0
    };

    clinicas.push(novaClinica);
    carregarClinicas();
    closeModal();
    
    // Toast de sucesso
    mostrarToast("Clínica adicionada com sucesso!");
}

function gerenciarAcessos(id) {
    const clinica = clinicas.find(c => c.id === id);
    alert(`Gerenciando acessos para: ${clinica.nome}`);
    // Futuramente abriria uma tela/modal específica de usuários
}

function editarClinica(id) {
    alert(`Editar clínica ID: ${id}`);
}

function excluirClinica(id) {
    if(confirm("Tem certeza que deseja excluir esta clínica?")) {
        const index = clinicas.findIndex(c => c.id === id);
        clinicas.splice(index, 1);
        carregarClinicas();
        mostrarToast("Clínica removida.");
    }
}

function mostrarToast(mensagem) {
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
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        border-left: 5px solid #53a587;
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
    `;
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #53a587;"></i> ${mensagem}`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// Inicia ao carregar a página
window.onload = () => {
    carregarClinicas();

    // Ajuste inicial da sidebar
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.add('sidebar-closed');
    }
};

// CSS adicional para o Toast (poderia estar no .css mas coloquei aqui para facilitar a dinâmica)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
