/**
 * ASSISTENTE DE IA — PORTAL DOS PAIS (SIMULAÇÃO / MVP)
 *
 * Reproduz, no frontend, o comportamento da IA que no backend (main.py)
 * humaniza o resumo da sessão e dispara um "WhatsApp" para a família.
 * Tom: acolhedor, sem jargões, começa com "Olá, família! 💙".
 *
 * Dois pontos de contato:
 *   1) Card "Resumo Inteligente" no topo do dashboard.
 *   2) Chat flutuante estilo WhatsApp.
 */

// Criança em foco na demonstração (alinha com os dados mockados em script.js)
const IA_CRIANCA = "João";

/* ============================================================
   BANCO DE TEXTOS (mesmo tom do prompt do backend)
   ============================================================ */

// Resumos para o card de overview (gerados "pela IA")
const IA_RESUMOS = [
  `${IA_CRIANCA} teve uma ótima semana! 💙 Demonstrou mais concentração nas atividades de coordenação motora e completou todos os exercícios propostos. A evolução geral está em <strong>75%</strong> — continue incentivando as brincadeiras sensoriais em casa.`,
  `Notamos um avanço bonito na regulação emocional do ${IA_CRIANCA}. 😊 Ele identificou corretamente a maioria das emoções trabalhadas e esteve tranquilo durante toda a sessão. Pequenos passos, grandes conquistas!`,
  `Que semana especial! ${IA_CRIANCA} iniciou contato espontâneo com um colega pela primeira vez. 💙 A interação social está florescendo. Em casa, vale reforçar momentos de brincadeira compartilhada.`,
];

// Resumo de sessão "estilo WhatsApp" (igual ao formato do backend)
function iaResumoSessaoWhatsApp() {
  return `Olá, família! 💙

Hoje o ${IA_CRIANCA} participou de atividades de coordenação motora fina, usando brinquedos sensoriais e encaixes. Ele esteve bem concentrado e completou tudo o que propusemos, com muito empenho! 😊

Foi um dia leve e produtivo. Continuem incentivando essas brincadeiras em casa — faz toda a diferença.`;
}

// Respostas contextuais simples para o que os pais digitarem
const IA_RESPOSTAS = [
  { palavras: ["humor", "bem", "feliz", "triste", "como ele", "como ela", "como foi"], resposta: `O ${IA_CRIANCA} chegou tranquilo e de bom humor 😊 Manteve-se engajado durante toda a sessão. Foi um ótimo dia!` },
  { palavras: ["comeu", "lanche", "comida", "almoço"], resposta: `Sim! O ${IA_CRIANCA} fez o lanche normalmente e aceitou bem os alimentos oferecidos. 🍎` },
  { palavras: ["próxima", "proxima", "agenda", "quando", "horário", "horario"], resposta: `A próxima sessão está agendada para <strong>22/05 às 14h</strong> 📅 Você também pode conferir tudo na aba Pagamentos e Relatórios.` },
  { palavras: ["obrigad", "valeu", "agradeço", "ótimo", "otimo", "legal"], resposta: `Nós que agradecemos a confiança! 💙 Estamos sempre aqui para o que a família precisar.` },
  { palavras: ["relatório", "relatorio", "evolução", "evolucao", "detalhe"], resposta: `Claro! Preparei o relatório completo da última sessão para você. 👇`, acao: "relatorio" },
];

const IA_RESPOSTA_PADRAO = `Estou aqui para ajudar! 💙 Posso te contar como foi a sessão de hoje, o humor do ${IA_CRIANCA}, a próxima data ou abrir o relatório completo. É só pedir!`;

/* ============================================================
   ESTADO E REFERÊNCIAS DE DOM
   ============================================================ */
let iaChatAberto = false;
let iaConversaIniciada = false;
let iaResumoIndex = 0;

/* ============================================================
   1) CARD DE RESUMO INTELIGENTE
   ============================================================ */
function iaGerarResumo() {
  const textoEl = document.getElementById("iaOverviewText");
  const botao = document.getElementById("btnGerarResumo");
  if (!textoEl) return;

  const novoTexto = IA_RESUMOS[iaResumoIndex % IA_RESUMOS.length];
  iaResumoIndex++;

  botao.disabled = true;
  iaDigitarTexto(textoEl, novoTexto, () => {
    botao.disabled = false;
  });
}

/**
 * Efeito "máquina de escrever" — simula a IA gerando o texto.
 * Como o texto contém HTML (<strong>), digitamos o texto puro e
 * só ao final aplicamos o HTML completo.
 */
function iaDigitarTexto(el, htmlFinal, aoTerminar) {
  const textoPuro = htmlFinal.replace(/<[^>]+>/g, "");
  let i = 0;
  el.classList.add("ia-digitando");
  el.innerHTML = `<span class="ia-typing-cursor">▋</span>`;

  const intervalo = setInterval(() => {
    i += 2; // 2 caracteres por tick para fluir mais rápido
    const parcial = textoPuro.slice(0, i);
    el.innerHTML = parcial + `<span class="ia-typing-cursor">▋</span>`;
    if (i >= textoPuro.length) {
      clearInterval(intervalo);
      el.innerHTML = htmlFinal; // aplica o HTML final (com <strong>)
      el.classList.remove("ia-digitando");
      if (aoTerminar) aoTerminar();
    }
  }, 18);
}

/* ============================================================
   2) CHAT FLUTUANTE ESTILO WHATSAPP
   ============================================================ */
function iaToggleChat() {
  iaChatAberto = !iaChatAberto;
  const chat = document.getElementById("iaChat");
  const badge = document.getElementById("iaFabBadge");
  chat.classList.toggle("open", iaChatAberto);

  if (iaChatAberto) {
    badge.classList.add("hidden");
    // Na primeira abertura, a IA inicia a conversa sozinha
    if (!iaConversaIniciada) {
      iaConversaIniciada = true;
      iaIniciarConversa();
    }
    setTimeout(() => {
      const input = document.getElementById("iaInput");
      if (input) input.focus();
    }, 300);
  }
}

function iaHora() {
  const d = new Date();
  return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
}

function iaScrollFim() {
  const body = document.getElementById("iaChatBody");
  if (body) body.scrollTop = body.scrollHeight;
}

/** Adiciona uma mensagem (bot ou user) ao corpo do chat. */
function iaAddMensagem(html, tipo, acao) {
  const body = document.getElementById("iaChatBody");
  const div = document.createElement("div");
  div.className = "ia-msg " + tipo;

  let acaoHtml = "";
  if (acao === "relatorio") {
    acaoHtml = `<button class="ia-msg-action" onclick="iaIrParaRelatorio()">
                  <i class="fa-solid fa-file-lines"></i> Ver relatório
                </button>`;
  }

  div.innerHTML = `${html}${acaoHtml}<span class="ia-msg-hora">${iaHora()}</span>`;
  body.appendChild(div);
  iaScrollFim();
}

/** Mostra o indicador "digitando..." e executa callback após o tempo. */
function iaMostrarDigitando(callback, tempo = 1100) {
  const body = document.getElementById("iaChatBody");
  const typing = document.createElement("div");
  typing.className = "ia-typing";
  typing.id = "iaTypingIndicator";
  typing.innerHTML = "<span></span><span></span><span></span>";
  body.appendChild(typing);
  iaScrollFim();

  setTimeout(() => {
    typing.remove();
    callback();
  }, tempo);
}

/** Sequência inicial: avisa que a criança chegou + resumo da sessão. */
function iaIniciarConversa() {
  iaMostrarDigitando(() => {
    iaAddMensagem(`Olá, família! 💙 Aqui é a assistente da Clínica TEA.`, "bot");
    iaMostrarDigitando(() => {
      iaAddMensagem(`O <strong>${IA_CRIANCA}</strong> chegou à clínica às 14h, tranquilo e bem disposto. 😊`, "bot");
      iaMostrarDigitando(() => {
        iaAddMensagem(iaResumoSessaoWhatsApp(), "bot");
        iaMostrarDigitando(() => {
          iaAddMensagem(`Quer ver o relatório completo desta sessão?`, "bot", "relatorio");
          iaMostrarQuickReplies();
        }, 900);
      }, 1400);
    }, 1000);
  }, 800);
}

/** Sugestões rápidas de perguntas. */
function iaMostrarQuickReplies() {
  const cont = document.getElementById("iaQuickReplies");
  if (!cont) return;
  const sugestoes = ["Como ele estava?", "Qual a próxima sessão?", "Ele se alimentou?"];
  cont.innerHTML = sugestoes
    .map((s) => `<button onclick="iaEnviarSugestao('${s.replace(/'/g, "\\'")}')">${s}</button>`)
    .join("");
}

function iaEnviarSugestao(texto) {
  document.getElementById("iaQuickReplies").innerHTML = "";
  iaEnviarMensagem(texto);
}

/** Envia a mensagem digitada pelo usuário. */
function iaEnviarMensagem(textoForcado) {
  const input = document.getElementById("iaInput");
  const texto = (textoForcado !== undefined ? textoForcado : input.value).trim();
  if (!texto) return;

  iaAddMensagem(texto, "user");
  if (input) input.value = "";
  document.getElementById("iaQuickReplies").innerHTML = "";

  // IA pensa e responde
  const { resposta, acao } = iaEscolherResposta(texto);
  iaMostrarDigitando(() => {
    iaAddMensagem(resposta, "bot", acao);
  }, 1000 + Math.min(texto.length * 20, 600));
}

/** Escolhe a resposta com base em palavras-chave. */
function iaEscolherResposta(texto) {
  const lower = texto.toLowerCase();
  for (const item of IA_RESPOSTAS) {
    if (item.palavras.some((p) => lower.includes(p))) {
      return { resposta: item.resposta, acao: item.acao };
    }
  }
  return { resposta: IA_RESPOSTA_PADRAO, acao: undefined };
}

/** Botão "Ver relatório" → navega para a aba de relatórios. */
function iaIrParaRelatorio() {
  iaToggleChat(); // fecha o chat
  if (typeof navigate === "function") navigate("relatorios");
}

/** Permite enviar com Enter. */
function iaInputKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    iaEnviarMensagem();
  }
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
window.addEventListener("load", () => {
  // Gera o primeiro resumo no card assim que a página carrega
  const textoEl = document.getElementById("iaOverviewText");
  if (textoEl) {
    setTimeout(() => iaGerarResumo(), 600);
  }
});
