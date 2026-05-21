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
    { paciente: "Ana Costa", plano: "Plus", valor: "R$ 1.800,00", vencimento: "10/04/2026", status: "atrasado" },
    { paciente: "Pedro Santos", plano: "Básico", valor: "R$ 1.200,00", vencimento: "15/06/2026", status: "ativo" },
    { paciente: "Beatriz Lima", plano: "Plus", valor: "R$ 1.800,00", vencimento: "20/06/2026", status: "pendente" },
];

const disciplinasData = [
    { id: 1, nome: 'ABA', icone: 'fa-puzzle-piece', cor: '#53a587', alunos: [1, 3] },
    { id: 2, nome: 'Fonoaudiologia', icone: 'fa-comment-dots', cor: '#1e40af', alunos: [1, 4] },
    { id: 3, nome: 'Terapia Ocupacional', icone: 'fa-hand-holding-heart', cor: '#f59e0b', alunos: [2, 4] },
    { id: 4, nome: 'Psicopedagogia', icone: 'fa-graduation-cap', cor: '#7c3aed', alunos: [] },
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
    if (page === 'matriculas') carregarMatriculas();
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
    if (event.target.id === 'modalMatricula') fecharModalMatricula();
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
    document.getElementById('listaPacientesCorpo').innerHTML = pacientes.map(p => {
        const finClass = p.financeiro === 'Em dia' ? 'badge-em-dia' : 'badge-pendente';
        return `
            <tr>
                <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div class="pac-avatar"><i class="fa-solid fa-user"></i></div>
                        <div><strong>${p.nome}</strong><br><small style="color:#9ca3af;">${p.nivel}</small></div>
                    </div>
                </td>
                <td>${p.proximaSessao}</td>
                <td>${p.disciplinas.split(',').map(d => `<span class="badge-disciplina-tag">${d.trim()}</span>`).join('')}</td>
                <td><span class="status-badge ${finClass}"><i class="fa-solid ${p.financeiro === 'Em dia' ? 'fa-circle-check' : 'fa-clock'}"></i> ${p.financeiro}</span></td>
                <td>${p.responsavel}</td>
                <td><button class="btn-360" onclick="verPaciente(${p.id})"><i class="fa-solid fa-circle-nodes"></i> Ver 360°</button></td>
            </tr>
        `;
    }).join('');
}

function verPaciente(id) {
    const p = pacientes.find(x => x.id === id);
    const finClass = p.financeiro === 'Em dia' ? 'badge-em-dia' : 'badge-pendente';
    const finIcon = p.financeiro === 'Em dia' ? 'fa-circle-check' : 'fa-clock';
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
                <div style="display:flex;align-items:center;gap:16px;">
                    <div class="pac-avatar-lg"><i class="fa-solid fa-user"></i></div>
                    <div>
                        <h2 style="font-size:22px;">${p.nome}</h2>
                        <span class="badge-level"><i class="fa-solid fa-brain"></i> ${p.nivel}</span>
                    </div>
                </div>
                <span class="status-badge ${finClass}"><i class="fa-solid ${finIcon}"></i> ${p.financeiro}</span>
            </div>

            <div class="metricas-row">
                <div class="metrica-mini"><i class="fa-solid fa-calendar-check"></i><strong>${p.totalSessoes}</strong><span>Sessões</span></div>
                <div class="metrica-mini"><i class="fa-solid fa-chart-line"></i><strong>${p.progresso}%</strong><span>Progresso</span></div>
                <div class="metrica-mini"><i class="fa-solid fa-book-open"></i><strong>${p.disciplinas.split(',').length}</strong><span>Disciplinas</span></div>
                <div class="metrica-mini"><i class="fa-solid fa-calendar-plus"></i><strong>${p.proximaSessao.split(' ')[1]}</strong><span>Próxima sessão</span></div>
            </div>

            <div class="panel-grid">
                <div class="info-card">
                    <h3><i class="fa-solid fa-calendar-check"></i> Próxima Sessão</h3>
                    <p style="font-size:15px;color:#2c3e50;font-weight:600;">${p.proximaSessao}</p>
                    <p style="margin-top:12px;font-size:13px;color:#7f8c8d;">Disciplinas</p>
                    <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px;">
                        ${p.disciplinas.split(',').map(d => `<span class="badge-disciplina-tag">${d.trim()}</span>`).join('')}
                    </div>
                </div>
                <div class="info-card">
                    <h3><i class="fa-solid fa-user"></i> Responsável</h3>
                    <p style="font-size:15px;color:#2c3e50;font-weight:600;">${p.responsavel}</p>
                    <p style="margin-top:12px;font-size:13px;color:#7f8c8d;">Telefone</p>
                    <p style="font-size:15px;color:#2c3e50;font-weight:600;">${p.telefoneResp}</p>
                </div>
            </div>

            <div class="info-card gold">
                <h3><i class="fa-solid fa-chart-line"></i> Progresso do Tratamento</h3>
                <div style="display:flex;align-items:center;gap:16px;margin-top:8px;">
                    <div style="flex:1;background:#f1f5f9;border-radius:999px;height:14px;overflow:hidden;">
                        <div style="width:${p.progresso}%;height:100%;background:linear-gradient(90deg,#53a587,#44a380);border-radius:999px;transition:width 0.6s ease;"></div>
                    </div>
                    <strong style="font-size:24px;color:#53a587;min-width:52px;">${p.progresso}%</strong>
                </div>
                <p style="margin-top:10px;font-size:13px;color:#7f8c8d;">${p.totalSessoes} sessões realizadas</p>
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
        <div class="prof-card">
            <div class="prof-avatar"><i class="fa-solid fa-user-doctor"></i></div>
            <h2 style="font-size:17px;font-weight:800;color:var(--text-dark);margin-bottom:4px;">${p.nome}</h2>
            <span class="prof-specialty">${p.especialidade}</span>
            <div class="prof-stats">
                <div class="prof-stat"><i class="fa-regular fa-clock"></i> ${p.carga} semanais</div>
                <div class="prof-stat"><i class="fa-solid fa-users"></i> ${p.pacientesAtivos} pacientes</div>
            </div>
            <button class="btn-prof-action" onclick="verAgendaProf('${p.nome}')">
                <i class="fa-solid fa-calendar-days"></i> Ver Agenda
            </button>
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

    const hoje = new Date().toISOString().split('T')[0];
    const amanha = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const depoisDeAmanha = new Date(Date.now() + 172800000).toISOString().split('T')[0];

    const eventosPorProfissional = {
        'Dra. Camila Sousa': [
            { title: 'ABA — João', start: `${hoje}T09:00:00`, end: `${hoje}T10:00:00`, color: '#53a587' },
            { title: 'ABA — Pedro', start: `${hoje}T11:00:00`, end: `${hoje}T12:00:00`, color: '#53a587' },
            { title: 'ABA — João', start: `${amanha}T09:00:00`, end: `${amanha}T10:00:00`, color: '#53a587' },
            { title: 'ABA — Beatriz', start: `${depoisDeAmanha}T14:00:00`, end: `${depoisDeAmanha}T15:00:00`, color: '#53a587' },
        ],
        'Dra. Fernanda Reis': [
            { title: 'Fono — Ana', start: `${hoje}T10:00:00`, end: `${hoje}T11:00:00`, color: '#1e40af' },
            { title: 'Fono — Beatriz', start: `${hoje}T14:00:00`, end: `${hoje}T15:00:00`, color: '#1e40af' },
            { title: 'Fono — Ana', start: `${amanha}T10:00:00`, end: `${amanha}T11:00:00`, color: '#1e40af' },
        ],
        'Dr. Lucas Mendes': [
            { title: 'T.O — Ana', start: `${hoje}T08:00:00`, end: `${hoje}T09:00:00`, color: '#f59e0b' },
            { title: 'T.O — Pedro', start: `${hoje}T13:00:00`, end: `${hoje}T14:00:00`, color: '#f59e0b' },
            { title: 'T.O — Ana', start: `${depoisDeAmanha}T08:00:00`, end: `${depoisDeAmanha}T09:00:00`, color: '#f59e0b' },
        ],
        'Dra. Patricia Alves': [
            { title: 'ABA — João', start: `${hoje}T15:00:00`, end: `${hoje}T16:00:00`, color: '#7c3aed' },
            { title: 'ABA — Pedro', start: `${amanha}T09:00:00`, end: `${amanha}T10:00:00`, color: '#7c3aed' },
            { title: 'ABA — Beatriz', start: `${amanha}T11:00:00`, end: `${amanha}T12:00:00`, color: '#7c3aed' },
        ],
    };

    setTimeout(() => {
        const calEl = document.getElementById('calendar-profissional');
        if (calEl._fcInstance) calEl._fcInstance.destroy();
        const cal = new FullCalendar.Calendar(calEl, {
            initialView: 'timeGridWeek',
            locale: 'pt-br',
            height: 500,
            scrollTime: '07:00:00',
            allDayText: 'Dia inteiro',
            buttonText: { today: 'Hoje', week: 'Semana', day: 'Dia' },
            headerToolbar: { left: 'prev,next today', center: 'title', right: 'timeGridWeek,timeGridDay' },
            events: eventosPorProfissional[nome] || [],
            eventDisplay: 'block',
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
    const badgeMap = {
        ativo:    { cls: 'badge-em-dia',   txt: 'Em dia',   icon: 'fa-circle-check' },
        pendente: { cls: 'badge-pendente', txt: 'Pendente', icon: 'fa-clock' },
        atrasado: { cls: 'badge-atrasado', txt: 'Atrasado', icon: 'fa-circle-exclamation' },
    };
    document.getElementById('listaFinanceiroCorpo').innerHTML = lista.map(f => {
        const b = badgeMap[f.status] || badgeMap.pendente;
        return `
            <tr>
                <td><strong>${f.paciente}</strong></td>
                <td><span class="badge-plano">${f.plano}</span></td>
                <td class="td-valor">${f.valor}</td>
                <td>${f.vencimento}</td>
                <td><span class="status-badge ${b.cls}"><i class="fa-solid ${b.icon}"></i> ${b.txt}</span></td>
            </tr>
        `;
    }).join('');
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

// Matrículas
function carregarMatriculas() {
    document.getElementById('gridMatriculas').innerHTML = disciplinasData.map(d => {
        const alunosInscritos = d.alunos.map(id => pacientes.find(p => p.id === id)).filter(Boolean);
        const tagsHTML = alunosInscritos.map(p => `
            <span class="aluno-tag">
                <i class="fa-solid fa-user"></i> ${p.nome}
                <button onclick="removerAluno(${d.id}, ${p.id})" title="Remover"><i class="fa-solid fa-xmark"></i></button>
            </span>
        `).join('');
        return `
            <div class="matricula-card">
                <div class="matricula-card-header">
                    <div class="matricula-icon" style="background:${d.cor}"><i class="fa-solid ${d.icone}"></i></div>
                    <div>
                        <strong style="font-size:16px;">${d.nome}</strong>
                        <p style="font-size:13px;color:#6b7280;margin-top:2px;">${alunosInscritos.length} aluno(s) inscrito(s)</p>
                    </div>
                </div>
                <div class="matricula-alunos">
                    <div class="alunos-tags">${tagsHTML || '<p style="font-size:13px;color:#9ca3af;">Nenhum aluno inscrito</p>'}</div>
                    <button class="btn-adicionar-aluno" onclick="abrirModalMatricula(${d.id})">
                        <i class="fa-solid fa-plus"></i> Adicionar Aluno
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function removerAluno(disciplinaId, alunoId) {
    const d = disciplinasData.find(x => x.id === disciplinaId);
    d.alunos = d.alunos.filter(id => id !== alunoId);
    carregarMatriculas();
}

function abrirModalMatricula(disciplinaId) {
    const d = disciplinasData.find(x => x.id === disciplinaId);
    const disponiveis = pacientes.filter(p => !d.alunos.includes(p.id));
    document.getElementById('conteudoModalMatricula').innerHTML = `
        <h2 style="margin-bottom:20px;color:var(--text-dark);">
            <i class="fa-solid ${d.icone}" style="color:${d.cor}"></i> Adicionar Aluno — ${d.nome}
        </h2>
        ${disponiveis.length === 0
            ? '<p style="color:#6b7280;">Todos os pacientes já estão inscritos nesta disciplina.</p>'
            : disponiveis.map(p => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:14px;background:#f8faf9;border-radius:12px;margin-bottom:10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#53a587,#44a380);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <strong>${p.nome}</strong>
                            <p style="font-size:12px;color:#6b7280;">${p.disciplinas}</p>
                        </div>
                    </div>
                    <button onclick="adicionarAluno(${d.id}, ${p.id})" style="background:linear-gradient(90deg,#53a587,#44a380);color:white;border:none;padding:8px 16px;border-radius:10px;font-weight:700;cursor:pointer;">
                        <i class="fa-solid fa-plus"></i> Inscrever
                    </button>
                </div>
            `).join('')
        }
    `;
    document.getElementById('modalMatricula').style.display = 'flex';
}

function adicionarAluno(disciplinaId, alunoId) {
    const d = disciplinasData.find(x => x.id === disciplinaId);
    if (!d.alunos.includes(alunoId)) d.alunos.push(alunoId);
    fecharModalMatricula();
    carregarMatriculas();
    mostrarToast('Aluno inscrito com sucesso!');
}

function fecharModalMatricula() {
    document.getElementById('modalMatricula').style.display = 'none';
}

// Humor na chegada (formulário de evolução)
function selecionarHumor(btn) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDashboard();
    carregarPacientes();
    carregarProfissionais();
    carregarFinanceiro();
    carregarMatriculas();
    inicializarCalendario();

    document.getElementById('formEvolucaoTecnica').addEventListener('submit', e => {
        e.preventDefault();
        mostrarToast('Sessão registrada com sucesso!');
        voltarParaGrid();
    });
});
