/**
 * SCRIPT PRINCIPAL DO PORTAL DA FAMÍLIA
 * Gerencia a troca de abas no login, navegação na dashboard e renderização de gráficos.
 */

// Variável global para controlar qual portal está selecionado (pais, clinica ou adm)
let currentTab = 'pais';

// Configurações dinâmicas de conteúdo exibidas na decoration-box (painel lateral colorido)
const tabContent = {
  pais: {
    title: "Cuidado, escuta e evolução para cada criança.",
    description: "Acompanhe sessões, relatórios clínicos, pagamentos e suporte da família em um só lugar.",
    benefits: [
      "Relatórios clínicos detalhados",
      "Acompanhamento por filho",
      "Histórico financeiro transparente"
    ]
  },
  clinica: {
    title: "Gestão completa para sua unidade de saúde.",
    description: "Otimize o atendimento da sua clínica com ferramentas especializadas para terapeutas.",
    benefits: [
      "Controle de disciplinas e horários",
      "Evolução detalhada de pacientes",
      "Escala dinâmica de terapeutas"
    ]
  },
  adm: {
    title: "Painel de Controle Central Administrativo.",
    description: "Gestão estratégica e global de todas as unidades da sua rede em tempo real.",
    benefits: [
      "Gestão global de clínicas",
      "Relatórios de faturamento consolidados",
      "Métricas de desempenho da rede"
    ]
  }
};

/**
 * Função de Login: Redireciona o usuário para o portal correspondente à aba ativa.
 */
function login() {
  if (currentTab === 'pais') {
    window.location.href = "dashboard.html"; // Vai para a dashboard dos Pais
  } else if (currentTab === 'clinica') {
    window.location.href = "../frontend-clinica/Insc-Disciplinas.html"; // Vai para o portal Clínico
  } else if (currentTab === 'adm') {
    window.location.href = "../frontend-adm/clinicas-list.html"; // Vai para o portal Administrativo
  }
}

/**
 * Função switchTab: Gerencia a troca visual e lógica entre Pais, Clínica e ADM.
 * @param {string} type - O tipo da aba ('pais', 'clinica' ou 'adm').
 */
function switchTab(type) {
  const oldTab = currentTab;
  currentTab = type;
  
  // Seleção de elementos do DOM
  const mainWrapper = document.querySelector('.main-wrapper');
  const cardWrapper = document.getElementById('card-wrapper');
  const decorationBox = document.getElementById('decoration-box');
  const isMobile = window.innerWidth <= 870;
  
  // 1. ATUALIZA ESTADO VISUAL DAS ABAS (Botões superiores)
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${type}`).classList.add('active');
  
  // 2. LÓGICA DE ANIMAÇÃO NO DESKTOP (Efeito Pop ao entrar no ADM)
  if (!isMobile) {
    cardWrapper.classList.remove('anim-pop');
    if (type === 'adm' || oldTab === 'adm') {
      void cardWrapper.offsetWidth; // Truque para reiniciar a animação CSS
      cardWrapper.classList.add('anim-pop');
    }
  }

  // 3. ALTERNA FORMULÁRIOS COM FADE (Opacidade controlada por Timeout)
  const forms = document.querySelectorAll('.login-form');
  forms.forEach(f => {
    f.style.opacity = '0';
    setTimeout(() => {
      f.style.display = 'none';
      if (f.id === `login-${type}`) {
        f.style.display = 'block';
        setTimeout(() => f.style.opacity = '1', 50);
      }
    }, 200);
  });
  
  // 4. ATUALIZA TEXTOS E BENEFÍCIOS NA DECORATION-BOX
  const content = tabContent[type];
  document.getElementById('decoration-title').innerText = content.title;
  document.getElementById('decoration-description').innerText = content.description;
  
  const benefitsContainer = document.getElementById('benefits-container');
  benefitsContainer.innerHTML = ''; // Limpa os benefícios anteriores
  content.benefits.forEach(benefit => {
    benefitsContainer.innerHTML += `
      <p class="benefit-item">
        <i class="fa-solid fa-circle-check" style="color: rgb(255, 255, 255);"></i>
        ${benefit}
      </p>
    `;
  });

  // 5. GERENCIAMENTO DE TEMAS E INVERSÃO DE LAYOUT
  if (type === 'pais') {
    // Volta ao estado original (Verde / Normal)
    cardWrapper.classList.remove('reverse');
    mainWrapper.classList.remove('reverse');
    mainWrapper.classList.remove('theme-adm');
    decorationBox.classList.remove('theme-adm');
    document.body.classList.remove('theme-adm'); // Restaura fundo padrão
  } else {
    // Ativa inversão de lado para Clínica e ADM
    if (!isMobile) {
      cardWrapper.classList.add('reverse');
      mainWrapper.classList.add('reverse');
    }
    
    // Aplica ou remove o tema ADM (Azul)
    if (type === 'adm') {
      mainWrapper.classList.add('theme-adm');
      decorationBox.classList.add('theme-adm');
      document.body.classList.add('theme-adm'); // Muda fundo para ADM
    } else {
      mainWrapper.classList.remove('theme-adm');
      decorationBox.classList.remove('theme-adm');
      document.body.classList.remove('theme-adm'); // Clínica usa fundo verde, mas layout reverse
    }
  }
}

/**
 * Funções da Sidebar (Abre/Fecha)
 */
function close_bars() {
  const graficos = document.querySelector(".graficos");
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("sidebar-closed"); // Alterna fechamento
  graficos.classList.toggle("graficos-centralizados"); // Ajusta gráficos ao espaço disponível
}

function logout() {
  window.location.href = "index.html"; // Sai do sistema
}

/**
 * Navegação Interna da Dashboard (Tabs de conteúdo)
 */
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
}


/* ============================================================
   LÓGICA DE CARREGAMENTO DA PÁGINA (DASHBOARD E GRÁFICOS)
   ============================================================ */

window.onload = () => {
  // Inicialização da Sidebar em dispositivos móveis
  if (window.innerWidth <= 768) {
    document.querySelector('.sidebar').classList.add('sidebar-closed');
  }

  // Monitora redimensionamento da janela para ajustar a Sidebar
  window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768) { 
      sidebar.classList.add('sidebar-closed');
    } else {
      sidebar.classList.remove('sidebar-closed');
    }
  });

  // Renderização de Gráficos (Chart.js)
  if (document.getElementById("graficoLinha")) { 
    // Popula cards informativos
    document.getElementById("totalSessao").innerText = "12";
    document.getElementById("ultimaSessao").innerText = "20/04";
    document.getElementById("progresso").innerText = "75%";

    // GRÁFICO DE LINHA: Histórico de Sessões
    const lineChart = new Chart(document.getElementById("graficoLinha"), {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'],
        datasets: [{
          data: [10, 15, 8, 20],
          borderColor: '#53a587',
          backgroundColor: 'rgba(83, 165, 135, 0.2)',
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Evolução de Atendimentos', color: '#000', font: { size: 18, weight: '400' } },
          legend: { display: false }
        }
      }
    });

    // GRÁFICO DE ROSCA: Distribuição por Tipo de Terapia
    const pieChart = new Chart(ctxPizza, {
      type: 'doughnut',
      data: {
        labels: ['ABA', 'TEACCH', 'Fonoaudiologia', 'Psicologia', 'Outros'],
        datasets: [{
          data: [60, 25, 15, 10, 5],
          backgroundColor: ['#2e7d32', '#1565c0', '#f9a825', '#ef6c00', '#9E9E9E'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Tipos das sessões', color: '#000', font: { size: 18, weight: '400' } },
          legend: { position: 'right', labels: { color: '#000', font: { size: 14 } } }
        },
        cutout: '50%'
      }
    });

    /**
     * Ajusta tamanhos dos gráficos para telas Full HD, 2K e 4K.
     */
    function ajustarGraficos() {
      const largura = window.innerWidth;
      let linhaBorderWidth = 3;
      let tituloFontSize = 18;
      let legendaFontSize = 14;

      if (largura >= 1920 && largura < 2560) { linhaBorderWidth = 5; tituloFontSize = 22; legendaFontSize = 16; }
      else if (largura >= 2560 && largura < 3840) { linhaBorderWidth = 7; tituloFontSize = 26; legendaFontSize = 18; }
      else if (largura >= 3840) { linhaBorderWidth = 10; tituloFontSize = 50; legendaFontSize = 35; }

      lineChart.data.datasets.forEach(dataset => dataset.borderWidth = linhaBorderWidth);
      lineChart.options.plugins.title.font.size = tituloFontSize;
      pieChart.options.plugins.title.font.size = tituloFontSize;
      pieChart.options.plugins.legend.labels.font.size = legendaFontSize;

      lineChart.update();
      pieChart.update();
    }

    ajustarGraficos();
    window.addEventListener("resize", ajustarGraficos);

    // Carrega dados iniciais da dashboard
    carregarFilhos();
    carregarPagamentos();
  }
};

const ctxPizza = document.getElementById('graficoPizza');

/**
 * Enviar Suporte: Exibe uma notificação (toast) de sucesso.
 */
function enviarSuporte() {
  const oldToast = document.querySelector('.toast-simple');
  if (oldToast) oldToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-simple';
  toast.innerHTML = '<i class="fa-solid fa-square-check" style="color: rgb(83, 165, 135);"></i> Mensagem enviada com sucesso!';
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => toast.remove(), 2500);
}

// ============================================================
// DADOS MOCKADOS (SIMULAÇÃO DE API)
// ============================================================

const filhos = ["João", "Maria"];

const relatorios = [
  { filho: "João", data: "2026-04-20", objetivo: "Coordenação motora", instrumento: "Brinquedos sensoriais", obs: "Boa evolução" },
  { filho: "Maria", data: "2026-04-18", objetivo: "Fala", instrumento: "Jogos de imitação", obs: "Precisa de mais estímulos" }
];

const pagamentos = [
  { data: "10/04", valor: "R$ 200", status: "Pago" },
  { data: "20/04", valor: "R$ 200", status: "Pendente" }
];

/**
 * Popula o select de filhos na dashboard.
 */
function carregarFilhos() {
  const select = document.getElementById("filhoSelect");
  if (!select) return;
  filhos.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f; opt.textContent = f;
    select.appendChild(opt);
  });
}

/**
 * Filtra relatórios clínicos por filho e data.
 */
function filtrarRelatorios() {
  const filho = document.getElementById("filhoSelect").value;
  const data = document.getElementById("dataFiltro").value;
  const resultado = relatorios.filter(r => r.filho === filho && (!data || r.data === data));

  const div = document.getElementById("relatorioResultado");
  div.innerHTML = resultado.length === 0 ? "Não há dados" : "";

  resultado.forEach(r => {
    div.innerHTML += `
      <div class="card">
        <p><b>Objetivo:</b> ${r.objetivo}</p>
        <p><b>Instrumento:</b> ${r.instrumento}</p>
        <p><b>Obs:</b> ${r.obs}</p>
      </div>
    `;
  });
}

/**
 * Renderiza a lista de pagamentos na dashboard.
 */
function carregarPagamentos() {
  const div = document.getElementById("listaPagamentos");
  if (!div) return;
  pagamentos.forEach(p => {
    div.innerHTML += `
      <div class="pagamento">
        ${p.data} - ${p.valor} - ${p.status}
      </div>
    `;
  });
}
