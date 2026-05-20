// Variáveis globais para controle de filtro e paginação
let filtroStatus = 'todas';
let termoBusca = '';
let paginaAtual = 1;
const itensPorPagina = 5;
let colunaOrdenacao = 'nome';
let ordemAscendente = true;

// Mock de dados das clínicas
const clinicas = [ // lista de clínicas fictícias para exibição
    { id: 1, nome: "Clínica TEA ", cnpj: "12.345.678/0001-90", status: "Ativa"},
    { id: 2, nome: "Centro de Apoio Azul", cnpj: "98.765.432/0001-10", status: "Ativa"},
    { id: 3, nome: "Espaço Estimular", cnpj: "45.678.901/0001-22", status: "Inativa"},
    { id: 3, nome: "Jhon TEA", cnpj: "47.878.211/06701-22", status: "Ativa"},
    { id: 3, nome: "Breno TEA", cnpj: "90.753.981/6111-42", status: "Ativa"},
    { id: 3, nome: "Huoc TEA", cnpj: "24.123.874/4301-66", status: "Inativa"},
    { id: 3, nome: "Central Azul", cnpj: "23.834.965/4413-99", status: "Inativa"},
];

// Inicia ao carregar a página
window.onload = () => {
    inicializarPagina();
};

function openModal() {
    document.getElementById('clinicModal').style.display = 'block'; // exibe o modal
}

function closeModal() {
    document.getElementById('clinicModal').style.display = 'none'; // esconde o modal
}

// Fecha o modal se clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('clinicModal');
    if (event.target == modal) {
        closeModal();
    }
}

async function inicializarPagina() {
    mostrarSkeleton();
    // Simula um pequeno delay de carregamento para o skeleton ser visível
    await new Promise(resolve => setTimeout(resolve, 800));
    
    carregarClinicas();
    atualizarContadores();
}

function carregarClinicas() {
    const tbody = document.getElementById('clinicasTableBody');
    tbody.innerHTML = '';

    // 1. Filtragem
    let clinicasFiltradas = clinicas.filter(c => {
        const matchesStatus = filtroStatus === 'todas' || c.status === filtroStatus;
        const matchesBusca = c.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
                             c.cnpj.includes(termoBusca);
        return matchesStatus && matchesBusca;
    });

    // 2. Ordenação
    clinicasFiltradas.sort((a, b) => {
        let valA = a[colunaOrdenacao].toLowerCase();
        let valB = b[colunaOrdenacao].toLowerCase();
        if (valA < valB) return ordemAscendente ? -1 : 1;
        if (valA > valB) return ordemAscendente ? 1 : -1;
        return 0;
    });

    // 3. Paginação
    const totalPaginas = Math.ceil(clinicasFiltradas.length / itensPorPagina) || 1;
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const clinicasPaginadas = clinicasFiltradas.slice(inicio, fim);

    // 4. Renderização ou Empty State
    if (clinicasFiltradas.length === 0) {
        exibirEmptyState();
        document.querySelector('.pagination-container').style.display = 'none';
        return;
    }

    document.querySelector('.pagination-container').style.display = 'flex';
    
    clinicasPaginadas.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.cnpj}</td>
            <td><span class="status-badge ${c.status === 'Ativa' ? 'status-active' : 'status-inactive'}">${c.status}</span></td>
            <td class="div-btns">
                <button class="btn-details" title="Gerenciar Acessos" onclick="gerenciarClinica('${c.nome}')">Detalhes</button>
                <button class="btn-delete" title="Excluir Clínica" onclick="excluirClinica(${c.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    atualizarPaginacao(totalPaginas);
}

function exibirEmptyState() {
    const tbody = document.getElementById('clinicasTableBody');
    tbody.innerHTML = `
        <tr>
            <td colspan="4">
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>Ops! Nenhuma clínica encontrada</h3>
                    <p>Tente ajustar sua busca ou filtro para encontrar o que procura.</p>
                </div>
            </td>
        </tr>
    `;
}

function mostrarSkeleton() {
    const tbody = document.getElementById('clinicasTableBody');
    tbody.innerHTML = '';
    for (let i = 0; i < itensPorPagina; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><div class="skeleton skeleton-text"></div></td>
            <td><div class="skeleton skeleton-text"></div></td>
            <td><div class="skeleton skeleton-badge"></div></td>
            <td><div class="skeleton skeleton-text"></div></td>
        `;
        tbody.appendChild(tr);
    }
}

function atualizarPaginacao(totalPaginas) {
    document.getElementById('pageInfo').innerText = `Página ${paginaAtual} de ${totalPaginas}`;
    document.getElementById('prevPage').disabled = paginaAtual === 1;
    document.getElementById('nextPage').disabled = paginaAtual === totalPaginas;
}

function mudarPagina(direcao) {
    paginaAtual += direcao;
    carregarClinicas();
}

function ordenarTabela(coluna) {
    if (colunaOrdenacao === coluna) {
        ordemAscendente = !ordemAscendente;
    } else {
        colunaOrdenacao = coluna;
        ordemAscendente = true;
    }
    
    // Atualiza ícones de ordenação
    const ths = document.querySelectorAll('th[onclick]');
    ths.forEach(th => {
        const icon = th.querySelector('i');
        icon.className = 'fa-solid fa-sort';
    });
    
    const activeTh = Array.from(ths).find(th => th.getAttribute('onclick').includes(coluna));
    const activeIcon = activeTh.querySelector('i');
    activeIcon.className = `fa-solid fa-sort-${ordemAscendente ? 'up' : 'down'}`;

    carregarClinicas();
}

function atualizarContadores() {
    const total = clinicas.length;
    const ativas = clinicas.filter(c => c.status === 'Ativa').length;
    const inativas = clinicas.filter(c => c.status === 'Inativa').length;

    document.getElementById('totalCount').innerText = total;
    document.getElementById('activeCount').innerText = ativas;
    document.getElementById('inactiveCount').innerText = inativas;
}

function buscarClinicas() {
    termoBusca = document.getElementById('searchInput').value;
    paginaAtual = 1; // Reseta para primeira página ao buscar
    carregarClinicas();
}

function filtrarPorStatus(status, event) {
    filtroStatus = status;
    paginaAtual = 1; // Reseta para primeira página ao filtrar
    
    document.querySelectorAll('.stat-card').forEach(card => card.style.borderColor = 'rgba(255, 255, 255, 0.5)');
    if (status !== 'todas' && event) {
        event.currentTarget.style.borderColor = '#1e40af';
    }

    carregarClinicas();
}

// Função para salvar o nome da clínica e redirecionar para a pagina de gerenciamento
function gerenciarClinica(nome) {
    localStorage.setItem('clinicaSelecionada', nome); // salva o nome da clínica escolhida no armazenamento local
    window.location.href = 'gerenciamento.html'; // redireciona para a página de gerenciamento da clínica
}

function salvarClinica(event) { // função para adicionar uma clinica nova na tabela
    event.preventDefault(); // evita que o formulário recarregue a página
    
    const nome = document.getElementById('nomeClinica').value; // pega o nome digitado no input
    const cnpj = document.getElementById('cnpjClinica').value; // pega o cnpj digitado no input
    const status = document.getElementById('statusClinica').value; // pega o status selecionado

    const novaClinica = { // cria um novo objeto de clínica com os dados do formulário
        id: clinicas.length + 1,
        nome: nome,
        cnpj: cnpj,
        status: status,
        acessos: 0
    };

    clinicas.push(novaClinica); // adiciona a nova clínica ao array de clínicas
    carregarClinicas(); // atualiza a tabela na tela
    atualizarContadores(); // atualiza os números dos cards
    closeModal(); // fecha o modal de cadastro
    
    // Limpa o formulário
    document.getElementById('clinicForm').reset();

    // Toast de sucesso
    mostrarToast("Clínica adicionada com sucesso!"); // exibe uma mensagem de sucesso
}

//função para excluir uma clinica da tabela, chamada pelo botão de lixo
function excluirClinica(id) {
    if(confirm("Tem certeza que deseja excluir esta clínica?")) { // pede confirmação antes de excluir
        const index = clinicas.findIndex(c => c.id === id); // encontra a posição da clínica no array
        clinicas.splice(index, 1); // remove a clínica do array
        carregarClinicas(); // atualiza a tabela na tela
        atualizarContadores(); // atualiza os números dos cards
        mostrarToast("Clínica removida."); // exibe mensagem de remoção
    }
}

function mostrarToast(mensagem) {
    const oldToast = document.querySelector('.toast-simple'); // busca por um toast já existente
    if (oldToast) oldToast.remove(); // remove o toast antigo para não bugar
    
    const toast = document.createElement('div'); // cria o elemento do toast
    toast.className = 'toast-simple'; // define a classe CSS do toast
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(30, 64, 175, 0.1);
        border-left: 5px solid #1e40af;
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
    `; // aplica estilos diretamente via JS para garantir o visual do toast
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #1e40af;"></i> ${mensagem}`; // insere o ícone e a mensagem
    document.body.appendChild(toast); // adiciona o toast ao corpo da página
    
    setTimeout(() => toast.remove(), 3000); // define que o toast sumirá após 3 segundos
}

// CSS adicional para o Toast, poderia estar no .css mas coloquei aqui para facilitar
const style = document.createElement('style'); // cria um elemento de estilo
style.innerHTML = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`; // define a animação de entrada do toast
document.head.appendChild(style); // adiciona o estilo ao cabeçalho do documento
