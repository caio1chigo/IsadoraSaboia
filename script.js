// =========================================================
// HELENA VALENÇA — ADVOCACIA
// Modelo conceitual para advogado(a) individual
// =========================================================

// ===== CONFIGURAÇÃO =====
// Trocar pelo WhatsApp oficial antes de uso real.
// Formato: 55 + DDD + número, sem espaços ou símbolos.
const WHATSAPP_NUMERO = "5511999999999";

// ===== MENU MOBILE =====
const menuBtn = document.getElementById("menu-btn");
const menuMobile = document.getElementById("menu-mobile");

function fecharMenuMobile() {
  if (!menuBtn || !menuMobile) return;

  menuMobile.classList.remove("aberto");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-aberto");
}

if (menuBtn && menuMobile) {
  menuBtn.addEventListener("click", () => {
    const aberto = menuMobile.classList.toggle("aberto");

    menuBtn.setAttribute("aria-expanded", String(aberto));
    document.body.classList.toggle("menu-aberto", aberto);
  });

  menuMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenuMobile);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharMenuMobile();
    }
  });
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (evento) => {
    const seletor = link.getAttribute("href");

    if (!seletor || seletor === "#") return;

    const destino = document.querySelector(seletor);

    if (!destino) return;

    evento.preventDefault();
    fecharMenuMobile();

    const cabecalho = document.querySelector(".cabecalho");
    const alturaHeader = cabecalho ? cabecalho.offsetHeight : 0;

    window.scrollTo({
      top: destino.getBoundingClientRect().top + window.scrollY - alturaHeader,
      behavior: "smooth",
    });
  });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const botaoTopo = document.getElementById("botao-topo");

function atualizarBotaoTopo() {
  if (!botaoTopo) return;

  botaoTopo.classList.toggle("visivel", window.scrollY > 420);
}

if (botaoTopo) {
  window.addEventListener("scroll", atualizarBotaoTopo, {
    passive: true,
  });

  atualizarBotaoTopo();

  botaoTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== FAQ =====
const faqItems = document.querySelectorAll(".item-faq");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((outroItem) => {
      if (outroItem !== item && outroItem.open) {
        outroItem.open = false;
      }
    });
  });
});

// ===== MÁSCARA DE WHATSAPP =====
const campoWhats = document.getElementById("whats");

if (campoWhats) {
  campoWhats.addEventListener("input", () => {
    const numeros = campoWhats.value.replace(/\D/g, "").slice(0, 11);

    let valorFormatado = numeros;

    if (numeros.length > 2) {
      valorFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length > 7) {
      valorFormatado =
        `(${numeros.slice(0, 2)}) ` +
        `${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }

    campoWhats.value = valorFormatado;
  });
}

// ===== FORMULÁRIO → WHATSAPP =====
const formulario = document.getElementById("contact-form");

if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = formulario.nome.value.trim();
    const whats = formulario.whats.value.trim();
    const assunto = formulario.assunto.value;
    const mensagem = formulario.msg.value.trim();

    const texto = [
      "Olá! Gostaria de solicitar um primeiro contato.",
      "",
      `Nome: ${nome}`,
      `WhatsApp: ${whats}`,
      `Assunto: ${assunto || "Não informado"}`,
      `Mensagem inicial: ${mensagem || "Não informada"}`,
      "",
      "Entendo que este contato inicial não constitui consulta ou aconselhamento jurídico.",
    ].join("\n");

    const linkWhatsApp =
      `https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`;

    window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector("#loader");

  document.body.classList.add("carregando");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("saindo");
      document.body.classList.remove("carregando");
      document.body.classList.add("pagina-pronta");

      document.querySelectorAll(".fade-in").forEach((elemento, index) => {
        elemento.style.transitionDelay = `${index * 80}ms`;
      });
    }, 1200);
  });
});
const elementosFade = document.querySelectorAll(".fade-in");

const observadorFade = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;

      entrada.target.classList.add("visivel");
      observadorFade.unobserve(entrada.target);
    });
  },
  {
    threshold: 0.12
  }
);

elementosFade.forEach((elemento) => {
  observadorFade.observe(elemento);
});