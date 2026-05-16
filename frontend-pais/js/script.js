// função unica e exclusiva da pag de LOGIN!!!
function login() {
  window.location.href = "dashboard.html"; // redireciona para a dashboard (página principal) após o login
}

function close_bars() {
  const graficos = document.querySelector(".graficos"); // seleciona a div pai dos graficos
  const sidebar = document.querySelector(".sidebar"); // seleciona a side bar
  sidebar.classList.toggle("sidebar-closed"); // adiciona ou remove a classe "sidebar-closed" para fechar ou abrir a sidebar
  graficos.classList.toggle("graficos-centralizados"); // adiciona ou remove a classe "graficos-centralizados" para os graficos centralizaerm quando fehcar a sidebar
}

function logout() {
  window.location.href = "index.html"; // redireciona para a página de login (index.html) ao clicar em logout
}

// NAVEGAÇÃO
function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active")); // remove a classe "active" de todas as páginas para esconder o conteúdo
  document.getElementById(page).classList.add("active"); // adiciona a classe "active" apenas para a página selecionada, mostrando seu conteúdo
}


// DASHBOARD
window.onload = () => { // assim que carrega a pág ele executa uma aero function

  if (window.innerWidth <= 768) { // se a largura da tela for menor ou igual a 768px
    document.querySelector('.sidebar').classList.add('sidebar-closed'); // vai colocar a classe "sidebar closed" na sidebar para ela começar fechada
  }

  window.addEventListener('resize', () => { // adiciona um listener para o evento de redimensionamento da janela, para ajustar a sidebar dinamicamente
    const sidebar = document.querySelector('.sidebar'); // pego a sidebar apara adicionar e remover a classe
    if (window.innerWidth <= 768) { 
      sidebar.classList.add('sidebar-closed'); // aqui é para fechar a sidebar quando for apertado o botão
    } else {
      sidebar.classList.remove('sidebar-closed'); // aqui é para abrir a sidebar quando for apertado o botão
    }
  });

  if (document.getElementById("graficoLinha")) { 

    document.getElementById("totalSessao").innerText = "12"; // escrita dos dados dos card
    document.getElementById("ultimaSessao").innerText = "20/04"; // escrita dos dados dos card
    document.getElementById("progresso").innerText = "75%"; // escrita dos dados dos card

    const lineChart = new Chart(document.getElementById("graficoLinha"), {
      type: 'line', // tipo do grafico
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr'], // mese do grafico
        datasets: [{
          data: [10, 15, 8, 20], // datas mockados ou dados
          borderColor: '#53a587',
          backgroundColor: 'rgba(83, 165, 135, 0.2)',
          tension: 0.2 // deixa a linha mais suave (curvada)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true, //ativa o titulo
            text: 'Tipos das sessões', // o texto do titulo
            color: '#000', // a cor do titulo (preto)
            font: { // fonte(auto-explicativa)
              size: 18,
              weight: '400'
            },
            padding: { // espaçamento do titulo
              bottom: 20
            }
          },
          legend: {
            display: false // esconde a legenda, pois nesse grafico de linha não tem mais de uma linha, então não é necessário
          },
        }
      }
    });
    const pieChart = new Chart(ctxPizza, {
      type: 'doughnut', // Tipo do gráfico
      data: {
        labels: ['ABA', 'TEACCH', 'Fonoaudiologia', 'Psicologia', 'Outros'], // Nomes dos dados do grafico
        datasets: [{
          data: [60, 25, 15, 10, 5], // dados mockados
          backgroundColor: [
            '#2e7d32',    // Verde principal (ABA)
            '#1565c0',    // Azul petroleo (TEACCH)
            '#f9a825',    // Amarelo suave (Fono)
            '#ef6c00',    // Laranja suave (Psico)
            '#9E9E9E'     // Cinza (Outros)
          ],
          borderWidth: 0 //espaçamento entre os dados do grafico
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { // configurações externas do grafico
          // TÍTULO "Tipos das sessões"
          title: {
            display: true, //ativa o titulo
            text: 'Tipos das sessões', // o texto do titulo
            color: '#000', // a cor do titulo (preto)
            font: { // fonte(auto-explicativa)
              size: 18,
              weight: '400'
            },
            padding: { // espaçamento do titulo
              bottom: 20
            }
          },

          // LEGENDAS (labels do lado do grafico)
          legend: {
            position: 'right', // posição das legendas (lado direito) mas pode ser top, left, bottom...
            labels: {
              color: '#000', // cor do texto das legendas (preto)
              font: { // fonte (também auto-explicativa)
                size: 14,
                weight: '400'
              },
              padding: 15 // espaçamento entre as legendas
            }
          }
        },

        // define o tamanho do "buraco" do grafico, ou seja, a parte central que fica vazia
        cutout: '50%'
      }
    });

    // RESPONSIVIDADE DOS GRÁFICOS
    function ajustarGraficos() {

      const largura = window.innerWidth;

      let linhaBorderWidth = 3;
      let tituloFontSize = 18;
      let legendaFontSize = 14;

      // FULL HD
      if (largura >= 1920 && largura < 2560) {
        linhaBorderWidth = 5;
        tituloFontSize = 22;
        legendaFontSize = 16;
      }

      // 2K
      else if (largura >= 2560 && largura < 3840) {
        linhaBorderWidth = 7;
        tituloFontSize = 26;
        legendaFontSize = 18;
      }

      // 4K
      else if (largura >= 3840) {
        linhaBorderWidth = 10;
        tituloFontSize = 50;
        legendaFontSize = 35;
      }

      // APLICAR NO GRÁFICO DE LINHA
      lineChart.data.datasets.forEach(dataset => {
        dataset.borderWidth = linhaBorderWidth;
      });

      lineChart.options.plugins.title.font.size = tituloFontSize;

      // APLICAR NO GRÁFICO DE PIZZA
      pieChart.options.plugins.title.font.size = tituloFontSize;

      pieChart.options.plugins.legend.labels.font.size = legendaFontSize;

      // ATUALIZA OS GRÁFICOS
      lineChart.update();
      pieChart.update();
    }

    ajustarGraficos();
    window.addEventListener("resize", ajustarGraficos);

    carregarFilhos(); //AQUI EU AINDA CARREGO ALGUNS DADOS MOCKADOS PARA TESTE, MAS DEVERÁ VIR DA API
    carregarPagamentos();
  }
};

const ctxPizza = document.getElementById('graficoPizza'); // pegando o elemento do grafico de pizza (canvas) para criar o grafico em cima dele



// MENSAGEM DE SUPORTE
function enviarSuporte() {
  // Remove toast anterior
  const oldToast = document.querySelector('.toast-simple');
  if (oldToast) oldToast.remove(); // remove o toast anterior para evitar acumulo de mensagens caso o usuário clique várias vezes no botão de suporte
  
  // Cria novo toast
  const toast = document.createElement('div'); // cria um elemento div para o toast
  toast.className = 'toast-simple';
  toast.innerHTML = '<i class="fa-solid fa-square-check" style="color: rgb(83, 165, 135);"></i> Mensagem enviada com sucesso! Em breve entraremos em contato.'; // conteúdo do toast, com um ícone de check e a mensagem de sucesso
  document.body.appendChild(toast); // adiciona o toast ao corpo do documento para que ele apareça na tela
  
  // Animação
  setTimeout(() => toast.classList.add('show'), 100); // pequena pausa para garantir que o toast seja adicionado ao DOM antes de iniciar a animação
  setTimeout(() => toast.remove(), 2000); // 2.5s depois, remove o toast da tela para limpar a interface
}


//================================ A APRTIR DAQUI É APENAS DADOS MOCKADOS PARA TESTE ====================================
// MOCK DATA
const filhos = ["João", "Maria"];

const relatorios = [
  {
    filho: "João",
    data: "2026-04-20",
    objetivo: "Coordenação motora",
    instrumento: "Brinquedos sensoriais",
    obs: "Boa evolução"
  },
  {
    filho: "João",
    data: "2026-04-20",
    objetivo: "Coordenação motora 2",
    instrumento: "Brinquedos sensoriais 2",
    obs: "Boa evolução !"
  },
  {
    filho: "João",
    data: "2026-04-15",
    objetivo: "Fala",
    instrumento: "Jogos de imitação",
    obs: "Precisa de mais estímulos"
  },
  {
    filho: "Maria",
    data: "2026-04-18",
    objetivo: "Fala",
    instrumento: "Jogos de imitação",
    obs: "Precisa de mais estímulos"
  }
];

const pagamentos = [
  { data: "10/04", valor: "R$ 200", status: "Pago" },
  { data: "20/04", valor: "R$ 200", status: "Pendente" },
  { data: "30/04", valor: "R$ 200", status: "Pendente" }
];



// FILHOS
function carregarFilhos() {
  const select = document.getElementById("filhoSelect");

  filhos.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    select.appendChild(opt);
  });
}

// RELATÓRIOS
function filtrarRelatorios() {
  const filho = document.getElementById("filhoSelect").value;
  const data = document.getElementById("dataFiltro").value;

  const resultado = relatorios.filter(r =>
    r.filho === filho && (!data || r.data === data)
  );

  const div = document.getElementById("relatorioResultado");
  div.innerHTML = "";

  if (resultado.length === 0) {
    div.innerHTML = "Não há dados";
    return;
  }

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

// PAGAMENTOS
function carregarPagamentos() {
  const div = document.getElementById("listaPagamentos");

  pagamentos.forEach(p => {
    div.innerHTML += `
      <div class="pagamento">
        ${p.data} - ${p.valor} - ${p.status}
      </div>
    `;
  });
}

