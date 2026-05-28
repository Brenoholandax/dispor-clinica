/**
 * PÁGINA DE PLANOS — CLÍNICA TEA (MVP somente frontend)
 * - Renderiza os cards de planos
 * - Toggle de cobrança mensal/anual (25% de desconto no anual)
 * - Modal de adesão (visual) → redireciona ao portal da clínica
 */

// Caminho relativo: planos.html e Home-clinica.html estão na mesma pasta (frontend-clinica),
// então o redirecionamento funciona em qualquer setup de servidor (raiz única ou por porta).
const PORTAL_CLINICA_URL = "Home-clinica.html";
const DESCONTO_ANUAL = 0.25; // 25% off no plano anual

// Estado: começa em "anual" (que é o mais vantajoso e vem selecionado).
let cobrancaAnual = true;

/**
 * Definição dos planos.
 * features: { texto, incluso (bool) } — incluso=false vira ícone de X.
 */
const PLANOS = [
  {
    id: "essencial",
    nome: "Essencial",
    desc: "Para clínicas que estão começando a digitalizar o atendimento.",
    preco: 497,
    cta: "Começar agora",
    features: [
      { texto: "Até 30 pacientes", incluso: true },
      { texto: "Até 5 profissionais", incluso: true },
      { texto: "Portal da Clínica + Portal dos Pais", incluso: true },
      { texto: "Relatórios de evolução", incluso: true },
      { texto: "Módulo financeiro", incluso: false },
      { texto: "Disparos por WhatsApp", incluso: false },
      { texto: "Multi-clínica", incluso: false },
    ],
  },
  {
    id: "profissional",
    nome: "Profissional",
    desc: "O mais escolhido por clínicas em crescimento. Tudo que você precisa.",
    preco: 997,
    popular: true,
    cta: "Começar agora",
    features: [
      { texto: "Até 100 pacientes", incluso: true },
      { texto: "Até 15 profissionais", incluso: true },
      { texto: "Todos os portais (Pais, Clínica, ADM)", incluso: true },
      { texto: "Módulo financeiro completo", incluso: true },
      { texto: "Disparos por WhatsApp com IA", incluso: true },
      { texto: "Multi-clínica", incluso: false },
      { texto: "Acesso à API", incluso: false },
    ],
  },
  {
    id: "clinica-plus",
    nome: "Clínica+",
    desc: "Para redes e clínicas de grande porte que precisam escalar.",
    preco: 1997,
    cta: "Começar agora",
    features: [
      { texto: "Até 300 pacientes", incluso: true },
      { texto: "Profissionais ilimitados", incluso: true },
      { texto: "Multi-clínica (até 3 unidades)", incluso: true },
      { texto: "Todos os recursos do Profissional", incluso: true },
      { texto: "Acesso à API", incluso: true },
      { texto: "Relatórios consolidados da rede", incluso: true },
      { texto: "White-label", incluso: false },
    ],
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    desc: "Solução sob medida para grandes redes com necessidades específicas.",
    preco: null, // Sob consulta
    cta: "Falar com vendas",
    enterprise: true,
    features: [
      { texto: "Pacientes e unidades ilimitados", incluso: true },
      { texto: "Profissionais ilimitados", incluso: true },
      { texto: "White-label completo", incluso: true },
      { texto: "SLA 99,9% garantido", incluso: true },
      { texto: "Gerente de conta dedicado", incluso: true },
      { texto: "Integrações personalizadas", incluso: true },
      { texto: "Onboarding e treinamento", incluso: true },
    ],
  },
];

/* ============================================================
   RENDERIZAÇÃO DOS CARDS
   ============================================================ */
function formatarReal(valor) {
  return valor.toLocaleString("pt-BR");
}

function precoExibido(plano) {
  if (plano.preco === null) return null;
  if (!cobrancaAnual) return plano.preco;
  // Mensal equivalente no plano anual (com 25% de desconto)
  return Math.round(plano.preco * (1 - DESCONTO_ANUAL));
}

function renderPlanos() {
  const grid = document.getElementById("planosGrid");
  grid.innerHTML = PLANOS.map((p) => {
    const featuresHtml = p.features
      .map((f) => {
        const icone = f.incluso ? "fa-circle-check" : "fa-circle-xmark";
        return `<li class="${f.incluso ? "" : "off"}">
                  <i class="fa-solid ${icone}"></i> ${f.texto}
                </li>`;
      })
      .join("");

    // Bloco de preço
    let precoHtml;
    let notaHtml;
    if (p.enterprise) {
      precoHtml = `<div class="plano-preco"><span class="plano-valor">Sob consulta</span></div>`;
      notaHtml = `<div class="plano-preco-nota">Plano personalizado para sua rede</div>`;
    } else {
      const valor = precoExibido(p);
      precoHtml = `<div class="plano-preco">
                     <span class="plano-moeda">R$</span>
                     <span class="plano-valor">${formatarReal(valor)}</span>
                     <span class="plano-periodo">/mês</span>
                   </div>`;
      notaHtml = cobrancaAnual
        ? `<div class="plano-preco-nota">
             <span class="riscado">R$ ${formatarReal(p.preco)}</span>
             cobrado anualmente · <strong>economize 25%</strong>
           </div>`
        : `<div class="plano-preco-nota">Cobrado mensalmente</div>`;
    }

    const ctaSolid = p.enterprise ? "" : ""; // popular já recebe estilo via classe do card
    return `
      <article class="plano-card ${p.popular ? "popular" : ""}">
        ${p.popular ? `<div class="popular-badge"><i class="fa-solid fa-star"></i> Mais Popular</div>` : ""}
        <div class="plano-nome">${p.nome}</div>
        <p class="plano-desc">${p.desc}</p>
        ${precoHtml}
        ${notaHtml}
        <button class="plano-cta ${ctaSolid}" onclick="acaoPlano('${p.id}')">${p.cta}</button>
        <ul class="plano-features">${featuresHtml}</ul>
      </article>`;
  }).join("");
}

/* ============================================================
   TOGGLE MENSAL / ANUAL
   ============================================================ */
function alternarCobranca() {
  cobrancaAnual = !cobrancaAnual;

  const sw = document.getElementById("switchPlano");
  sw.classList.toggle("mensal", !cobrancaAnual);

  document.getElementById("labelMensal").classList.toggle("active", !cobrancaAnual);
  document.getElementById("labelAnual").classList.toggle("active", cobrancaAnual);

  renderPlanos();
}

/* ============================================================
   AÇÃO DO BOTÃO DE CADA PLANO
   ============================================================ */
function acaoPlano(idPlano) {
  const plano = PLANOS.find((p) => p.id === idPlano);

  if (plano.enterprise) {
    // "Falar com vendas" — em produção abriria contato/WhatsApp. No MVP, mostramos aviso.
    alert("Nossa equipe comercial entrará em contato! 💙\n\n(Demonstração — em produção, abriria o canal de vendas.)");
    return;
  }

  abrirModal(plano);
}

/* ============================================================
   MODAL DE ADESÃO
   ============================================================ */
function abrirModal(plano) {
  document.getElementById("modalPlanoBadge").textContent = "Plano " + plano.nome;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function fecharModalFora(event) {
  // Fecha apenas se clicar no fundo escuro, não no conteúdo do modal
  if (event.target.id === "modalOverlay") fecharModal();
}

function confirmarAdesao(event) {
  event.preventDefault();
  // MVP: sem envio real. Apenas redireciona ao portal da clínica.
  window.location.href = PORTAL_CLINICA_URL;
}

// Fecha o modal com a tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharModal();
});

// Inicialização
renderPlanos();
