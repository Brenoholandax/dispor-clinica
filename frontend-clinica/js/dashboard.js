// Mock de dados
const pacientes = [
    { id: 1, nome: "João Silva", proximaSessao: "20/05/2026 14:00", disciplinas: "ABA, Fono", financeiro: "Em dia", responsavel: "Maria Silva",
      telefoneResp: "(11) 99234-5678", nivel: "Nível 2", totalSessoes: 24, progresso: 78,
      historico: [
        { data: "20/04/2026", tipo: "ABA", obs: "Boa evolução na coordenação motora fina. Completou todas as atividades." },
        { data: "13/04/2026", tipo: "Fonoaudiologia", obs: "Progresso moderado. Identificou corretamente 4 das 6 emoções." }
      ]
    },
    { id: 2, nome: "Ana Costa", proximaSessao: "20/05/2026 15:30", disciplinas: "T.O", financeiro: "Pendente", responsavel: "Carlos Costa",
      telefoneResp: "(11) 98765-4321", nivel: "Nível 1", totalSessoes: 12, progresso: 45,
      historico: [
        { data: "19/04/2026", tipo: "Terapia Ocupacional", obs: "Dificuldade com integração sensorial. Recomendado aumento de frequência." },
        { data: "12/04/2026", tipo: "Terapia Ocupacional", obs: "Sessão produtiva. Completou exercícios de AVD com auxílio." }
      ]
    },
    { id: 3, nome: "Pedro Santos", proximaSessao: "21/05/2026 09:00", disciplinas: "ABA", financeiro: "Em dia", responsavel: "Lucia Santos",
      telefoneResp: "(11) 91234-5678", nivel: "Nível 3", totalSessoes: 36, progresso: 91,
      historico: [
        { data: "21/04/2026", tipo: "ABA", obs: "Excelente sessão. Pedro iniciou contato espontâneo com colega pela 1ª vez." },
        { data: "14/04/2026", tipo: "ABA", obs: "Atingiu meta de comunicação funcional. Evolução acima do esperado." }
      ]
    },
    { id: 4, nome: "Beatriz Lima", proximaSessao: "21/05/2026 11:00", disciplinas: "Fono, T.O", financeiro: "Em dia", responsavel: "Roberto Lima",
      telefoneResp: "(11) 97654-3210", nivel: "Nível 2", totalSessoes: 18, progresso: 62,
      historico: [
        { data: "18/04/2026", tipo: "Fonoaudiologia", obs: "Ampliou vocabulário funcional. Formou frases de 3 palavras com apoio." },
        { data: "11/04/2026", tipo: "Terapia Ocupacional", obs: "Melhora na motricidade fina. Completou encaixe de 6 peças." }
      ]
    },
];

const profissionaisData = [
    { nome: "Dra. Camila Sousa", especialidade: "ABA", carga: "40h", pacientesAtivos: 12 },
    { nome: "Dra. Fernanda Reis", especialidade: "Fono", carga: "30h", pacientesAtivos: 8 },
    { nome: "Dr. Lucas Mendes", especialidade: "T.O", carga: "36h", pacientesAtivos: 10 },
    { nome: "Dra. Patricia Alves", especialidade: "ABA", carga: "40h", pacientesAtivos: 14 },
];

const financeiroData = [
    { paciente: "João Silva", plano: "Básico", valor: "R$ 1.200,00", vencimento: "05/06/2026", status: "ativo" },
    { paciente: "Ana Costa", plano: "Plus", valor: "R$ 1.800,00", vencimento: "10/06/2026", status: "pendente" },
    { paciente: "Pedro Santos", plano: "Básico", valor: "R$ 1.200,00", vencimento: "15/06/2026", status: "ativo" },
    { paciente: "Beatriz Lima", plano: "Plus", valor: "R$ 1.800,00", vencimento: "20/06/2026", status: "ativo" },
];

let calGeral = null;

// Navegação
function navigate(page, event) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');

    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    if (page === 'agenda' && calGeral) {
        setTimeout(() => calGeral.updateSize(), 50);
    }
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('sidebar-closed');
}

function logout() {
    window.location.href = '../frontend-pais/index.html';
}

// Modais
function fecharModal() {
    document.getElementById('modalPaciente').style.display = 'none';
}

function fecharModalProf() {
    document.getElementById('modalProfissional').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.id === 'modalPaciente') fecharModal();
    if (event.target.id === 'modalProfissional') fecharModalProf();
};

// Dashboard home
function carregarDashboard() {
    document.getElementById('totalPacientes').innerText = pacientes.length;
    document.getElementById('sessoesHoje').innerText = 3;

    const tbody = document.querySelector('#tabelaAtendimentos tbody');
    tbody.innerHTML = pacientes.slice(0, 3).map((p, i) => `
        <tr>
            <td>${p.nome}</td>
            <td>${profissionaisData[i % profissionaisData.length].nome}</td>
            <td>${p.disciplinas.split(',')[0].trim()}</td>
            <td>${p.proximaSessao.split(' ')[1]}</td>
        </tr>
    `).join('');
}

// Pacientes
function carregarPacientes() {
    document.getElementById('listaPacientesCorpo').innerHTML = pacientes.map(p => `
        <tr>
            <td>${p.nome}</td>
            <td>${p.proximaSessao}</td>
            <td>${p.disciplinas}</td>
            <td><span class="status-badge ${p.financeiro === 'Em dia' ? 'status-active' : 'status-inactive'}">${p.financeiro}</span></td>
            <td>${p.responsavel}</td>
            <td><button class="btn-details" onclick="verPaciente(${p.id})">Ver 360°</button></td>
        </tr>
    `).join('');
}

function verPaciente(id) {
    const p = pacientes.find(x => x.id === id);
    const finClass = p.financeiro === 'Em dia' ? 'status-active' : 'status-inactive';
    const historicoHTML = p.historico.map(h => `
        <div class="historico-item">
            <div class="historico-meta">
                <span class="historico-tipo">${h.tipo}</span>
                <span class="historico-data">${h.data}</span>
            </div>
            <p class="historico-obs">${h.obs}</p>
        </div>
    `).join('');

    document.getElementById('detalhesPacienteConteudo').innerHTML = `
        <div class="patient-panel">
            <div class="panel-header">
                <div>
                    <h2>${p.nome}</h2>
                    <span class="badge-level"><i class="fa-solid fa-brain"></i> ${p.nivel}</span>
                </div>
                <span class="status-badge ${finClass}">${p.financeiro}</span>
            </div>

            <div class="panel-grid">
                <div class="info-card">
                    <h3><i class="fa-solid fa-calendar-check"></i> Próxima Sessão</h3>
                    <p style="font-size:15px; color:#2c3e50; font-weight:600;">${p.proximaSessao}</p>
                    <p style="margin-top:12px; font-size:13px; color:#7f8c8d;">Disciplinas</p>
                    <p style="font-size:15px; color:#2c3e50; font-weight:600;">${p.disciplinas}</p>
                </div>
                <div class="info-card">
                    <h3><i class="fa-solid fa-user"></i> Responsável</h3>
                    <p style="font-size:15px; color:#2c3e50; font-weight:600;">${p.responsavel}</p>
                    <p style="margin-top:12px; font-size:13px; color:#7f8c8d;">Telefone</p>
                    <p style="font-size:15px; color:#2c3e50; font-weight:600;">${p.telefoneResp}</p>
                </div>
            </div>

            <div class="info-card gold">
                <h3><i class="fa-solid fa-chart-line"></i> Progresso do Tratamento</h3>
                <div style="display:flex; align-items:center; gap:16px; margin-top:8px;">
                    <div style="flex:1; background:#f1f5f9; border-radius:999px; height:12px; overflow:hidden;">
                        <div style="width:${p.progresso}%; height:100%; background:linear-gradient(90deg,#53a587,#44a380); border-radius:999px;"></div>
                    </div>
                    <strong style="font-size:22px; color:#53a587; min-width:48px;">${p.progresso}%</strong>
                </div>
                <p style="margin-top:10px; font-size:13px; color:#7f8c8d;">${p.totalSessoes} sessões realizadas</p>
            </div>

            <div class="info-card">
                <h3><i class="fa-solid fa-clock-rotate-left"></i> Últimas Sessões</h3>
                <div class="historico-lista">${historicoHTML}</div>
            </div>
        </div>
    `;
    document.getElementById('modalPaciente').style.display = 'flex';
}

// Profissionais
function carregarProfissionais() {
    renderizarProfissionais(profissionaisData);
}

function renderizarProfissionais(lista) {
    document.getElementById('gridProfissionais').innerHTML = lista.map(p => `
        <div class="card-disciplina" onclick="verAgendaProf('${p.nome}')">
            <div class="card-icon"><i class="fa-solid fa-user-doctor"></i></div>
            <h2>${p.nome}</h2>
            <p>${p.especialidade} · ${p.carga} semanais</p>
            <p><strong>${p.pacientesAtivos}</strong> pacientes ativos</p>
            <button class="btn-detalhes">Ver Agenda</button>
        </div>
    `).join('');
}

function filtrarProfissionais() {
    const filtro = document.getElementById('filtroEspecialidade').value;
    const filtrados = filtro === 'todos'
        ? profissionaisData
        : profissionaisData.filter(p => p.especialidade === filtro);
    renderizarProfissionais(filtrados);
}

function verAgendaProf(nome) {
    document.getElementById('nomeProfissionalModal').innerText = `Agenda — ${nome}`;
    document.getElementById('modalProfissional').style.display = 'flex';

    setTimeout(() => {
        const calEl = document.getElementById('calendar-profissional');
        if (calEl._fcInstance) calEl._fcInstance.destroy();
        const cal = new FullCalendar.Calendar(calEl, {
            initialView: 'timeGridWeek',
            locale: 'pt-br',
            height: 500,
            headerToolbar: { left: 'prev,next', center: 'title', right: 'timeGridWeek,timeGridDay' }
        });
        cal.render();
        calEl._fcInstance = cal;
    }, 100);
}

// Financeiro
function carregarFinanceiro() {
    renderizarFinanceiro(financeiroData);
}

function renderizarFinanceiro(lista) {
    document.getElementById('listaFinanceiroCorpo').innerHTML = lista.map(f => `
        <tr>
            <td>${f.paciente}</td>
            <td>${f.plano}</td>
            <td>${f.valor}</td>
            <td>${f.vencimento}</td>
            <td><span class="status-badge ${f.status === 'ativo' ? 'status-active' : 'status-inactive'}">${f.status === 'ativo' ? 'Em dia' : 'Pendente'}</span></td>
        </tr>
    `).join('');
}

function filtrarFinanceiro(status, event) {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    const filtrados = status === 'todos' ? financeiroData : financeiroData.filter(f => f.status === status);
    renderizarFinanceiro(filtrados);
}

// Calendário geral
function inicializarCalendario() {
    const calEl = document.getElementById('calendar-geral');
    if (!calEl || typeof FullCalendar === 'undefined') return;
    const hoje = new Date().toISOString().split('T')[0];
    calGeral = new FullCalendar.Calendar(calEl, {
        initialView: 'timeGridWeek',
        locale: 'pt-br',
        height: 600,
        scrollTime: '08:00:00',
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' },
        events: [
            { title: 'ABA — João', start: `${hoje}T09:00:00`, end: `${hoje}T10:00:00`, color: '#53a587' },
            { title: 'Fono — Ana', start: `${hoje}T11:00:00`, end: `${hoje}T12:00:00`, color: '#1e40af' },
            { title: 'T.O — Pedro', start: `${hoje}T14:00:00`, end: `${hoje}T15:00:00`, color: '#ffa726' },
        ]
    });
    calGeral.render();
}

// Evolução
function abrirFormularioEvolucao(especialidade) {
    document.getElementById('tituloFormEvolucao').innerText = especialidade;
    document.getElementById('gridEvolucaoEspecialidades').style.display = 'none';
    document.getElementById('containerFormEvolucao').style.display = 'block';

    const select = document.getElementById('evolucaoPaciente');
    select.innerHTML = pacientes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
    document.getElementById('evolucaoData').value = new Date().toISOString().slice(0, 16);
}

function voltarParaGrid() {
    document.getElementById('gridEvolucaoEspecialidades').style.display = 'grid';
    document.getElementById('containerFormEvolucao').style.display = 'none';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDashboard();
    carregarPacientes();
    carregarProfissionais();
    carregarFinanceiro();
    inicializarCalendario();

    document.getElementById('formEvolucaoTecnica').addEventListener('submit', e => {
        e.preventDefault();
        mostrarToast('Sessão registrada com sucesso!');
        voltarParaGrid();
    });
});
