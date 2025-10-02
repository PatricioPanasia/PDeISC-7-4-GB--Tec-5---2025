function irAPagina(a) {
    window.location.href = a;
  }
  function mostrarCantidadDeHijos() {
  const cantidad = document.body.children.length;
  const resultado = document.getElementById("resultado");
  resultado.innerText = "El <body> tiene " + cantidad + " hijos.";
}
