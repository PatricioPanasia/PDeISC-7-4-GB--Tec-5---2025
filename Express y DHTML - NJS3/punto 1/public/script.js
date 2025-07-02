function irAPagina(a) {
    window.location.href = a;
  }
  function agregarH1() {
  if (!document.getElementById("titulo")) {
    const h1 = document.createElement("h1");
    h1.id = "titulo";
    h1.innerText = "Hola DOM";
    document.body.insertBefore(h1, document.querySelector('.editor'));
  }
}

function cambiarTexto(valor) {
  const h1 = document.getElementById("titulo");
  if (h1) h1.innerText = valor;
}

function cambiarColor(color) {
  const h1 = document.getElementById("titulo");
  if (h1) h1.style.color = color;
}

function agregarImagen(url) {
  const img = document.getElementById("imagen");
  if (url) {
    img.src = url;
    img.style.display = "block";
    img.style.width = "200px";
  }
}

function cambiarImagen(url) {
  const img = document.getElementById("imagen");
  if (img && img.style.display !== "none") {
    img.src = url;
  }
}

function cambiarTamaño(valor) {
  const img = document.getElementById("imagen");
  if (img && img.style.display !== "none") {
    img.style.width = valor + "px";
  }
}
