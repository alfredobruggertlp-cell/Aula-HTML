// ===================================================
// 1) Validação do formulário de contato
// ===================================================
const formulario = document.getElementById("formulario");
 
formulario.addEventListener("submit", function (evento) {
  // Impede o envio automático para podermos validar antes
  evento.preventDefault();
 
  // trim() remove espaços do começo e do fim
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
 
  if (nome === "" && email === "") {
    // Os dois campos vazios
    alert("Preencha o nome e o e-mail.");
  } else if (nome === "") {
    alert("O campo nome não pode ficar vazio.");
  } else if (email === "") {
    alert("O campo e-mail não pode ficar vazio.");
  } else if (!email.includes("@") || !email.includes(".com")) {
    // O e-mail precisa ter "@" e "." para ser considerado válido
    alert("Digite um e-mail válido (ele deve conter @ e .).");
  } else {
    alert("Obrigado, " + nome + "! Recebemos seu contato.");
    formulario.reset();
  }
});
 
// ===================================================
// 2) Carrossel de fotos do produto
// ===================================================
 
// Procura cada foto com a extensão certa (o Windows costuma esconder a extensão)
const extensoes = [".jpeg", ".png", ".jpg.jpg", ".jpeg.jpg", ".png.jpg", ".png.png", ".webp", ".jfif"];
document.querySelectorAll(".slide img").forEach(function (img) {
  const base = img.getAttribute("src").replace(/\.[^.]+$/, "");
  let tentativa = 0;
  function proxima() {
    if (tentativa < extensoes.length) {
      img.src = base + extensoes[tentativa];
      tentativa++;
    }
  }
  img.addEventListener("error", proxima);
  if (img.complete && img.naturalWidth === 0) {
    proxima();
  }
});
 
const carrossel = document.getElementById("carrossel");
const pista = carrossel.querySelector(".carrossel-pista");
const fotos = pista.querySelectorAll(".slide");
const pontos = carrossel.querySelector(".pontos");
const botaoAnterior = carrossel.querySelector(".anterior");
const botaoProximo = carrossel.querySelector(".proxima");
 
let atual = 0;
let temporizador = null;
 
// Cria um ponto (bolinha) para cada foto
fotos.forEach(function (foto, i) {
  const ponto = document.createElement("button");
  ponto.type = "button";
  ponto.setAttribute("aria-label", "Ir para a foto " + (i + 1));
  ponto.addEventListener("click", function () {
    mostrar(i);
    reiniciarAutomatico();
  });
  pontos.appendChild(ponto);
});
 
function mostrar(indice) {
  // Volta ao início depois da última foto, e vai para a última antes da primeira
  if (indice >= fotos.length) {
    indice = 0;
  } else if (indice < 0) {
    indice = fotos.length - 1;
  }
  atual = indice;
  pista.style.transform = "translateX(-" + atual * 100 + "%)";
 
  pontos.querySelectorAll("button").forEach(function (ponto, i) {
    ponto.classList.toggle("ativo", i === atual);
  });
}
 
botaoAnterior.addEventListener("click", function () {
  mostrar(atual - 1);
  reiniciarAutomatico();
});
 
botaoProximo.addEventListener("click", function () {
  mostrar(atual + 1);
  reiniciarAutomatico();
});
 
// Troca de foto automática a cada 4 segundos (pausa quando o mouse está em cima)
function iniciarAutomatico() {
  temporizador = setInterval(function () {
    mostrar(atual + 1);
  }, 4000);
}
 
function reiniciarAutomatico() {
  clearInterval(temporizador);
  iniciarAutomatico();
}
 
carrossel.addEventListener("mouseenter", function () {
  clearInterval(temporizador);
});
carrossel.addEventListener("mouseleave", iniciarAutomatico);
 
mostrar(0);
iniciarAutomatico();