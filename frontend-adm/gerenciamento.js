// Aguarda o carregamento do DOM para iniciar as funções
document.addEventListener('DOMContentLoaded', () => {
    const nomeClinica = localStorage.getItem('clinicaSelecionada'); // busca o nome da clínica salva no navegador
    const tituloElement = document.getElementById('tituloClinica'); // seleciona o elemento do título da página

    if (nomeClinica) { // se houver um nome de clínica salvo
        tituloElement.textContent = `Gerenciamento: ${nomeClinica}`; // define o título com o nome da clínica
    } else {
        tituloElement.textContent = 'Gerenciamento de Clínica'; // define um título padrão caso não encontre o nome
    }

    // Mock de dados para Acessos e Alunos (números aleatórios para visualização)
    document.getElementById('numAcessos').textContent = "10"; 
    document.getElementById('numAlunos').textContent = "25";

    // Preenchimento de Boletos Mockados
    carregarBoletosMock(); // chama a função para carregar a tabela de boletos
});

// Função para gerar boletos fictícios
function carregarBoletosMock() {
    const tbody = document.getElementById('boletosTableBody'); // seleciona o corpo da tabela de boletos
    const meses = [ // array com os dados mock para aparecer na tabela de boletos
        { mes: 'Janeiro/2026', venc: '10/01/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Fevereiro/2026', venc: '10/02/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Março/2026', venc: '10/03/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Abril/2026', venc: '10/04/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Maio/2026', venc: '10/05/2026', valor: 'R$ 250,00', status: 'Não Pago' }
    ];

    tbody.innerHTML = ''; // limpa o conteúdo atual da tabela

    meses.forEach(b => { // percorre cada item do array de meses
        const tr = document.createElement('tr'); // cria uma nova linha para a tabela
        const statusClass = b.status === 'Pago' ? 'status-paid' : 'status-pending'; // define a classe CSS baseada no status
        
        tr.innerHTML = `
            <td>${b.mes}</td>
            <td>${b.venc}</td>
            <td>${b.valor}</td>
            <td><span class="status-badge ${statusClass}">${b.status}</span></td>
            <td>
                <button class="btn-view" onclick="abrirBoleto('${b.mes}')">
                    <i class="fa-solid fa-external-link"></i> Abrir Boleto
                </button>
            </td>
        `; // insere o conteúdo HTML na linha da tabela
        tbody.appendChild(tr); // adiciona a linha ao corpo da tabela
    });
}

// Função simulada para abrir o boleto
function abrirBoleto(mes) {
    alert(`Visualizando boleto refente a: ${mes}\n(Isso abriria um PDF em uma nova aba)`); // exibe um alerta simulando a abertura do PDF
}
