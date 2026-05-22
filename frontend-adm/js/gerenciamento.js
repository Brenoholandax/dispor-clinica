document.addEventListener('DOMContentLoaded', () => {
    const nomeClinica = localStorage.getItem('clinicaSelecionada');
    const titulo = document.getElementById('tituloClinica');
    titulo.textContent = nomeClinica ? `Gerenciamento: ${nomeClinica}` : 'Gerenciamento de Clínica';
    simularCarregamento();
});

function simularCarregamento() {
    const content = document.getElementById('content');
    content.classList.add('is-loading');
    setTimeout(() => {
        carregarDadosEstatisticos();
        carregarBoletosMock();
        content.classList.remove('is-loading');
        inicializarGrafico();
    }, 1500);
}

function carregarDadosEstatisticos(periodo = 'este-mes') {
    const acessosElem = document.getElementById('numAcessos');
    const alunosElem = document.getElementById('numAlunos');
    if (periodo === 'este-mes') {
        acessosElem.textContent = '150';
        alunosElem.textContent = '25';
    } else if (periodo === 'ultimos-3') {
        acessosElem.textContent = '480';
        alunosElem.textContent = '32';
    } else {
        acessosElem.textContent = String(Math.floor(Math.random() * 200) + 100);
        alunosElem.textContent = String(Math.floor(Math.random() * 15) + 20);
    }
}

function handlePeriodoChange(valor) {
    const customRange = document.getElementById('customDateRange');
    if (valor === 'personalizado') {
        customRange.style.display = 'flex';
    } else {
        customRange.style.display = 'none';
        simularCarregamento();
    }
}

function aplicarFiltroPersonalizado() {
    const inicio = document.getElementById('dataInicio').value;
    const fim = document.getElementById('dataFim').value;
    if (!inicio || !fim) {
        mostrarToast('Selecione as datas de início e fim.', 'erro');
        return;
    }
    if (new Date(inicio) > new Date(fim)) {
        mostrarToast('A data de início deve ser anterior à data de fim.', 'erro');
        return;
    }
    simularCarregamento();
}

const boletosMock = [
    { mes: 'Janeiro/2026',   venc: '10/01/2026', valor: 'R$ 250,00', status: 'Pago',     codigo: '34191.79001 01043.510047 91020.150008 1 93010000025000' },
    { mes: 'Fevereiro/2026', venc: '10/02/2026', valor: 'R$ 250,00', status: 'Pago',     codigo: '34191.79001 01043.510047 91020.150008 2 93020000025000' },
    { mes: 'Março/2026',     venc: '10/03/2026', valor: 'R$ 250,00', status: 'Pago',     codigo: '34191.79001 01043.510047 91020.150008 3 93030000025000' },
    { mes: 'Abril/2026',     venc: '10/04/2026', valor: 'R$ 250,00', status: 'Pago',     codigo: '34191.79001 01043.510047 91020.150008 4 93040000025000' },
    { mes: 'Maio/2026',      venc: '10/05/2026', valor: 'R$ 250,00', status: 'Não Pago', codigo: '34191.79001 01043.510047 91020.150008 5 93050000025000' },
];

function carregarBoletosMock() {
    const tbody = document.getElementById('boletosTableBody');
    tbody.innerHTML = '';
    boletosMock.forEach((b, i) => {
        const tr = document.createElement('tr');
        const isPago = b.status === 'Pago';
        tr.innerHTML = `
            <td>${b.mes}</td>
            <td>${b.venc}</td>
            <td>${b.valor}</td>
            <td><span class="status-badge ${isPago ? 'status-paid' : 'status-pending'}">${b.status}</span></td>
            <td>
                <button class="btn-view" onclick="abrirBoleto(${i})">
                    <i class="fa-solid fa-file-invoice"></i> Visualizar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

let codigoBoletoAtual = '';

function abrirBoleto(index) {
    const b = boletosMock[index];
    const isPago = b.status === 'Pago';
    codigoBoletoAtual = b.codigo;
    document.getElementById('modalBoletoBody').innerHTML = `
        <div class="boleto-info-row">
            <span class="boleto-label">Referência</span>
            <span class="boleto-valor">${b.mes}</span>
        </div>
        <div class="boleto-info-row">
            <span class="boleto-label">Vencimento</span>
            <span class="boleto-valor">${b.venc}</span>
        </div>
        <div class="boleto-info-row">
            <span class="boleto-label">Valor</span>
            <span class="boleto-valor"><strong>${b.valor}</strong></span>
        </div>
        <div class="boleto-info-row">
            <span class="boleto-label">Status</span>
            <span class="status-badge ${isPago ? 'status-paid' : 'status-pending'}">${b.status}</span>
        </div>
        <div class="boleto-codigo">
            <span class="boleto-label">Código de Barras</span>
            <div class="boleto-codigo-valor">${b.codigo}</div>
        </div>
        ${!isPago ? `<div class="boleto-aviso"><i class="fa-solid fa-triangle-exclamation"></i> Boleto em aberto. Realize o pagamento até ${b.venc}.</div>` : ''}
    `;
    document.getElementById('modalBoleto').style.display = 'flex';
}

function fecharModalBoleto(event) {
    if (event && event.target !== document.getElementById('modalBoleto')) return;
    document.getElementById('modalBoleto').style.display = 'none';
}

function copiarCodigoBoleto() {
    navigator.clipboard.writeText(codigoBoletoAtual)
        .then(() => mostrarToast('Código copiado para a área de transferência!'))
        .catch(() => mostrarToast('Selecione o código manualmente para copiar.'));
}

let graficoEvolucao = null;

function inicializarGrafico() {
    const ctx = document.getElementById('graficoEvolucao');
    if (!ctx) return;
    if (graficoEvolucao) graficoEvolucao.destroy();
    graficoEvolucao = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Dez/25', 'Jan/26', 'Fev/26', 'Mar/26', 'Abr/26', 'Mai/26'],
            datasets: [
                {
                    label: 'Acessos',
                    data: [90, 110, 130, 160, 190, 150],
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30,64,175,0.08)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#1e40af',
                    pointRadius: 4,
                },
                {
                    label: 'Alunos',
                    data: [20, 22, 23, 28, 30, 25],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.06)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#3b82f6',
                    pointRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { color: '#1e40af', font: { size: 13, weight: '600' } } }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { color: '#64748b' } },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });
}

function mostrarToast(mensagem, tipo) {
    const isErro = tipo === 'erro';
    const cor = isErro ? '#ef4444' : '#1e40af';
    const icone = isErro ? 'fa-circle-xmark' : 'fa-circle-check';
    const old = document.querySelector('.toast-adm');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-adm';
    toast.style.cssText = `
        position:fixed;bottom:20px;right:20px;background:white;
        padding:15px 20px;border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,0.12);
        border-left:5px solid ${cor};z-index:9999;
        display:flex;align-items:center;gap:10px;
        font-family:inherit;font-size:14px;font-weight:500;color:#1e293b;
        animation:toastInAdm 0.3s ease;
    `;
    toast.innerHTML = `<i class="fa-solid ${icone}" style="color:${cor};font-size:18px;"></i> ${mensagem}`;
    document.body.appendChild(toast);
    if (!document.getElementById('toast-adm-anim')) {
        const s = document.createElement('style');
        s.id = 'toast-adm-anim';
        s.textContent = '@keyframes toastInAdm{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}';
        document.head.appendChild(s);
    }
    setTimeout(() => toast.remove(), 3000);
}
