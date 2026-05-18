// Inicia ao carregar a página
window.onload = () => {
    carregarClinicas(); // chama a função para listar as clínicas ao carregar a página
};

function openModal() {
    document.getElementById('clinicModal').style.display = 'block'; // exibe o modal(a telinha que aparece para adicionar a clinica) de cadastro de clínica mudando o display para block
}

function closeModal() {
    document.getElementById('clinicModal').style.display = 'none'; // esconde o modal(a telinha que aparece para adicionar a clinica) de cadastro de clínica mudando o display para none
}

// Fecha o modal(a telinha que aparece para adicionar a clinica) se clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('clinicModal'); // seleciona o elemento do modal
    if (event.target == modal) { // verifica se o clique foi fora do conteúdo do modal
        closeModal(); // chama a função para fechar o modal
    }
}

// Mock de dados das clínicas
const clinicas = [ // lista de clínicas fictícias para exibição
    { id: 1, nome: "Clínica TEA ", cnpj: "12.345.678/0001-90", status: "Ativa"},
    { id: 2, nome: "Centro de Apoio Azul", cnpj: "98.765.432/0001-10", status: "Ativa"},
    { id: 3, nome: "Espaço Estimular", cnpj: "45.678.901/0001-22", status: "Inativa"}
];

function carregarClinicas() {
    const tbody = document.getElementById('clinicasTableBody'); // seleciona o corpo da tabela de clínicas
    tbody.innerHTML = ''; // limpa a tabela antes de carregar os dados

    clinicas.forEach(c => { // percorre cada clínica no array
        const tr = document.createElement('tr'); // cria uma nova linha na tabela
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.cnpj}</td>
            <td><span class="status-badge ${c.status === 'Ativa' ? 'status-active' : 'status-inactive'}">${c.status}</span></td>
            <td class="div-btns">
                <button class="btn-details" title="Gerenciar Acessos" onclick="gerenciarClinica('${c.nome}')">Detalhes</button>
                <button class="btn-delete" title="Excluir Clínica" onclick="excluirClinica(${c.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `; // preenche a linha com os dados da clínica e o botão de detalhes
        tbody.appendChild(tr); // adiciona a linha preenchida na tabela
    });
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
    closeModal(); // fecha o modal de cadastro
    
    // Toast de sucesso
    mostrarToast("Clínica adicionada com sucesso!"); // exibe uma mensagem de sucesso
}

//função para excluir uma clinica da tabela, chamada pelo botão de lixo
function excluirClinica(id) {
    if(confirm("Tem certeza que deseja excluir esta clínica?")) { // pede confirmação antes de excluir
        const index = clinicas.findIndex(c => c.id === id); // encontra a posição da clínica no array
        clinicas.splice(index, 1); // remove a clínica do array
        carregarClinicas(); // atualiza a tabela na tela
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
