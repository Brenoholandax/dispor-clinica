// Aguarda o carregamento do DOM para iniciar as funções
document.addEventListener('DOMContentLoaded', () => {
    const nomeClinica = localStorage.getItem('clinicaSelecionada');
    const tituloElement = document.getElementById('tituloClinica');

    if (nomeClinica) {
        tituloElement.textContent = `Gerenciamento: ${nomeClinica}`;
    } else {
        tituloElement.textContent = 'Gerenciamento de Clínica';
    }

    // Inicia com o estado de carregamento simulado
    simularCarregamento();
});

// Função para simular o carregamento de dados (Skeleton Screen)
function simularCarregamento() {
    const content = document.getElementById('content');
    content.classList.add('is-loading'); // Ativa skeletons

    // Simula um atraso de rede de 1.5 segundos
    setTimeout(() => {
        carregarDadosEstatisticos();
        carregarBoletosMock();
        content.classList.remove('is-loading'); // Remove skeletons e mostra conteúdo
    }, 1500);
}

// Função para carregar dados estatísticos (agora pode ser chamada por filtros)
function carregarDadosEstatisticos(periodo = 'este-mes') {
    const acessosElem = document.getElementById('numAcessos');
    const alunosElem = document.getElementById('numAlunos');

    // Mock de lógica de filtro (valores mudam dependendo do período)
    if (periodo === 'este-mes') {
        acessosElem.textContent = "150";
        alunosElem.textContent = "25";
    } else if (periodo === 'ultimos-3') {
        acessosElem.textContent = "480";
        alunosElem.textContent = "32";
    } else {
        // Personalizado ou outros
        acessosElem.textContent = Math.floor(Math.random() * 500) + 50;
        alunosElem.textContent = Math.floor(Math.random() * 20) + 15;
    }
}

// Gerencia a mudança no select de período
function handlePeriodoChange(valor) {
    const customRange = document.getElementById('customDateRange');
    
    if (valor === 'personalizado') {
        customRange.style.display = 'flex';
    } else {
        customRange.style.display = 'none';
        simularCarregamento(); // Recarrega com animação para o novo período
    }
}

// Aplica o filtro de data personalizada
function aplicarFiltroPersonalizado() {
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;

    if (!inicio || !fim) {
        alert('Por favor, selecione as datas de início e fim.');
        return;
    }

    console.log(`Filtrando de ${inicio} até ${fim}`);
    simularCarregamento();
}

// Função para gerar boletos fictícios
function carregarBoletosMock() {
    const tbody = document.getElementById('boletosTableBody');
    const meses = [
        { mes: 'Janeiro/2026', venc: '10/01/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Fevereiro/2026', venc: '10/02/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Março/2026', venc: '10/03/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Abril/2026', venc: '10/04/2026', valor: 'R$ 250,00', status: 'Pago' },
        { mes: 'Maio/2026', venc: '10/05/2026', valor: 'R$ 250,00', status: 'Não Pago' }
    ];

    tbody.innerHTML = '';

    meses.forEach(b => {
        const tr = document.createElement('tr');
        const statusClass = b.status === 'Pago' ? 'status-paid' : 'status-pending';
        
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
        `;
        tbody.appendChild(tr);
    });
}

// Função simulada para abrir o boleto
function abrirBoleto(mes) {
    alert(`Visualizando boleto refente a: ${mes}\n(Isso abriria um PDF em uma nova aba)`);
}
