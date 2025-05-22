const data = {
  letras: [],
  numeros: [],
  texto: []
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton"),
  estadoInput: document.getElementById("estadoInput"),
  titulo: document.querySelector(".titulo-formulario")
};

let etapa = "letras";

// Funciones reutilizables
function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarMensaje(texto, color) {
  DOM.mensaje.textContent = texto;
  DOM.mensaje.style.color = color;
}

function crearElemento(tag, texto, estilos = {}) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;
  Object.assign(elemento.style, estilos);
  return elemento;
}

function crearItemLista(texto, tipo = 'normal') {
  const li = document.createElement('li');
  li.textContent = texto;
  li.className = 'lista-item';
  
  if (tipo === 'letras') {
    li.style.borderLeft = '4px solid #4CAF50';
  } else if (tipo === 'numeros') {
    li.style.borderLeft = '4px solid #2196F3';
  } else if (tipo === 'texto') {
    li.style.borderLeft = '4px solid #FF9800';
  }
  
  DOM.lista.appendChild(li);
  return li;
}

// Funciones para mostrar datos invertidos
function mostrarLetrasInvertidas() {
  if (data.letras.length > 0) {
    const titulo = crearElemento('h3', 'Letras ingresadas:', { marginTop: '20px', marginBottom: '10px', color: '#4CAF50' });
    DOM.lista.appendChild(titulo);
    
    data.letras.forEach(letra => crearItemLista(letra, 'letras'));
    
    const tituloInvertido = crearElemento('h3', 'Letras invertidas:', { marginTop: '20px', marginBottom: '10px', color: '#4CAF50' });
    DOM.lista.appendChild(tituloInvertido);
    
    const letrasInvertidas = [...data.letras].reverse();
    letrasInvertidas.forEach(letra => crearItemLista(letra, 'letras'));
  }
}

function mostrarNumerosInvertidos() {
  if (data.numeros.length > 0) {
    const titulo = crearElemento('h3', 'Números ingresados:', { marginTop: '20px', marginBottom: '10px', color: '#2196F3' });
    DOM.lista.appendChild(titulo);
    
    data.numeros.forEach(num => crearItemLista(num.toString(), 'numeros'));
    
    const tituloInvertido = crearElemento('h3', 'Números invertidos:', { marginTop: '20px', marginBottom: '10px', color: '#2196F3' });
    DOM.lista.appendChild(tituloInvertido);
    
    const numerosInvertidos = [...data.numeros].reverse();
    numerosInvertidos.forEach(num => crearItemLista(num.toString(), 'numeros'));
  }
}

function mostrarTextoInvertido() {
  if (data.texto.length > 0) {
    const textoOriginal = data.texto[0];
    const titulo = crearElemento('h3', 'Texto original:', { marginTop: '20px', marginBottom: '10px', color: '#FF9800' });
    DOM.lista.appendChild(titulo);
    crearItemLista(textoOriginal, 'texto');
    
    const tituloInvertido = crearElemento('h3', 'Texto invertido:', { marginTop: '20px', marginBottom: '10px', color: '#FF9800' });
    DOM.lista.appendChild(tituloInvertido);
    
    const textoArray = textoOriginal.split('');
    const textoInvertido = textoArray.reverse().join('');
    crearItemLista(textoInvertido, 'texto');
  }
}

function actualizarUI() {
  DOM.titulo.textContent = etapa === "letras" ? "Ingresar letras" : 
                         etapa === "numeros" ? "Ingresar números" : 
                         "Ingresar texto";
  
  if (etapa === "letras") {
    DOM.etiqueta.textContent = `Ingrese letra ${data.letras.length + 1}/10:`;
    DOM.boton.textContent = data.letras.length < 10 ? "Guardar letra" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
  } else if (etapa === "numeros") {
    DOM.etiqueta.textContent = `Ingrese número ${data.numeros.length + 1}/5:`;
    DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
  } else if (etapa === "texto") {
    DOM.etiqueta.textContent = "Ingrese un texto:";
    DOM.boton.textContent = data.texto.length < 1 ? "Guardar texto" : "Finalizar";
    DOM.estadoInput.style.display = 'none';
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado!";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
  }
  
  limpiarLista();
  
  if (data.letras.length > 0) mostrarLetrasInvertidas();
  if (data.numeros.length > 0) mostrarNumerosInvertidos();
  if (data.texto.length > 0) mostrarTextoInvertido();
}

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = DOM.entrada.value.trim();

  if (valor === "") {
    mostrarMensaje("Por favor, ingrese un valor.", "red");
    return;
  }

  if (etapa === "letras") {
    if (valor.length !== 1 || !/^[a-zA-Z]$/.test(valor)) {
      mostrarMensaje("Por favor, ingrese una sola letra.", "red");
      return;
    }
    
    data.letras.push(valor.toLowerCase());
    mostrarMensaje(`Letra guardada: ${valor}`, "green");
    
    if (data.letras.length === 10) {
      etapa = "numeros";
    }

  } else if (etapa === "numeros") {
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
      mostrarMensaje("Por favor, ingrese un número válido.", "red");
      return;
    }
    
    data.numeros.push(numero);
    mostrarMensaje(`Número guardado: ${numero}`, "blue");
    
    if (data.numeros.length === 5) {
      etapa = "texto";
    }
    
  } else if (etapa === "texto") {
    data.texto.push(valor);
    mostrarMensaje(`Texto guardado: ${valor}`, "orange");
    etapa = "finalizado";
  }
  
  DOM.entrada.value = '';
  actualizarUI();
});

// Inicializar la UI
actualizarUI();