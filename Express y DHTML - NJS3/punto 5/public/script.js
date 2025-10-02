function irAPagina(a) {
    window.location.href = a;
  }
  function generarID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function crearContenedor(id, html, tipo, modificarCallback) {
  const contenedor = document.createElement("div");
  contenedor.className = "elemento";
  contenedor.id = id;
  contenedor.innerHTML = html;

  if (modificarCallback) {
    const input = document.createElement("input");
    input.placeholder = "Modificar contenido...";
    input.oninput = () => modificarCallback(input.value);
    contenedor.appendChild(input);
  }

  const btnEliminar = document.createElement("button");
  btnEliminar.innerText = "Eliminar";
  btnEliminar.onclick = () => contenedor.remove();

  contenedor.appendChild(btnEliminar);
  document.getElementById("contenido-dinamico").appendChild(contenedor);
}

function agregarH1() {
  const texto = document.getElementById("inputH1").value;
  if (!texto) return;
  const id = generarID();
  crearContenedor(id, `<h1>${texto}</h1>`, 'h1', nuevo => {
    document.querySelector(`#${id} h1`).textContent = nuevo;
  });
}

function agregarParrafo() {
  const texto = document.getElementById("inputP").value;
  if (!texto) return;
  const id = generarID();
  crearContenedor(id, `<p>${texto}</p>`, 'p', nuevo => {
    document.querySelector(`#${id} p`).textContent = nuevo;
  });
}

function agregarLista() {
  const val1 = document.getElementById("inputLista1").value;
  const val2 = document.getElementById("inputLista2").value;
  const val3 = document.getElementById("inputLista3").value;
  if (!val1 || !val2 || !val3) return;

  const id = generarID();
  const html = `<ul><li>${val1}</li><li>${val2}</li><li>${val3}</li></ul>`;
  crearContenedor(id, html, 'ul');
}

function agregarImagen() {
  const url = document.getElementById("inputImg").value;
  if (!url) return;
  const id = generarID();
  const html = `<img src="${url}" alt="Imagen dinámica">`;
  crearContenedor(id, html, 'img', nuevo => {
    document.querySelector(`#${id} img`).src = nuevo;
  });
}

function agregarEnlace() {
  const url = document.getElementById("inputHref").value;
  const texto = document.getElementById("inputTextoEnlace").value;
  if (!url || !texto) return;

  const id = generarID();
  const html = `<a href="${url}" target="_blank">${texto}</a>`;
  crearContenedor(id, html, 'a', nuevo => {
    const a = document.querySelector(`#${id} a`);
    a.textContent = nuevo;
  });
}
