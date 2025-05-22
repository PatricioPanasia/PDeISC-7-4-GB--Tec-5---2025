const data = {
  numeros: [],
  palabras: [],
  personas: []
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

let etapa = "numeros";

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
  
  // Aplicar estilos según el tipo
  if (tipo === 'numeros') {
    li.style.borderLeft = '4px solid #4CAF50';
  } else if (tipo === 'palabras') {
    li.style.borderLeft = '4px solid #2196F3';
  } else if (tipo === 'personas') {
    li.style.borderLeft = '4px solid #FF9800';
  }
  
  DOM.lista.appendChild(li);
  return li;
}

// Funciones para mostrar datos ordenados
function mostrarNumerosOrdenados() {
  if (data.numeros.length > 0) {
    const titulo = crearElemento('h3', 'Números ordenados de menor a mayor:', {
      marginTop: '20px',
      marginBottom: '10px',
      color: '#4CAF50'
    });
    DOM.lista.appendChild(titulo);
    
    const numerosOrdenados = [...data.numeros].sort((a, b) => a - b);
    numerosOrdenados.forEach(num => {
      crearItemLista(num.toString(), 'numeros');
    });
  }
}

function mostrarPalabrasOrdenadas() {
  if (data.palabras.length > 0) {
    const titulo = crearElemento('h3', 'Palabras ordenadas alfabéticamente:', {
      marginTop: '20px',
      marginBottom: '10px',
      color: '#2196F3'
    });
    DOM.lista.appendChild(titulo);
    
    const palabrasOrdenadas = [...data.palabras].sort((a, b) => a.localeCompare(b));
    palabrasOrdenadas.forEach(palabra => {
      crearItemLista(palabra, 'palabras');
    });
  }
}

function mostrarPersonasOrdenadas() {
  if (data.personas.length > 0) {
    const titulo = crearElemento('h3', 'Personas ordenadas por edad (menor a mayor):', {
      marginTop: '20px',
      marginBottom: '10px',
      color: '#FF9800'
    });
    DOM.lista.appendChild(titulo);
    
    const personasOrdenadas = [...data.personas].sort((a, b) => a.edad - b.edad);
    personasOrdenadas.forEach(persona => {
      crearItemLista(`${persona.nombre} (${persona.edad} años)`, 'personas');
    });
  }
}

function actualizarUI() {
  // Actualizar título del formulario según la etapa
  DOM.titulo.textContent = etapa === "numeros" ? "Ordenar números" : 
                          etapa === "palabras" ? "Ordenar palabras" : 
                          "Ordenar personas por edad";
  
  if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
  } else if (etapa === "palabras") {
    DOM.etiqueta.textContent = "Ingrese una palabra:";
    DOM.boton.textContent = data.palabras.length < 5 ? "Guardar palabra" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
  } else if (etapa === "personas") {
    DOM.etiqueta.textContent = "Ingrese nombre:";
    DOM.boton.textContent = data.personas.length < 5 ? "Guardar persona" : "Finalizar";
    DOM.estadoInput.style.display = 'block';
    DOM.estadoInput.innerHTML = `
      <label class="etiqueta-formulario">Edad:</label>
      <input class="input-formulario" type="number" id="edad" min="1" required>
    `;
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado!";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.estadoInput.style.display = 'none';
  }
  
  limpiarLista();
  
  // Mostrar datos según la etapa actual
  if (data.numeros.length > 0) mostrarNumerosOrdenados();
  if (data.palabras.length > 0) mostrarPalabrasOrdenadas();
  if (data.personas.length > 0) mostrarPersonasOrdenadas();
}

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = DOM.entrada.value.trim();

  if (valor === "") {
    mostrarMensaje("Por favor, ingrese un valor.", "red");
    return;
  }

  if (etapa === "numeros") {
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
      mostrarMensaje("Por favor, ingrese un número válido.", "red");
      return;
    }
    
    data.numeros.push(numero);
    mostrarMensaje(`Número guardado: ${numero}`, "green");
    
    if (data.numeros.length === 5) {
      etapa = "palabras";
    }

  } else if (etapa === "palabras") {
    data.palabras.push(valor);
    mostrarMensaje(`Palabra guardada: ${valor}`, "blue");
    
    if (data.palabras.length === 5) {
      etapa = "personas";
    }
    
  } else if (etapa === "personas") {
    const edadInput = document.getElementById("edad");
    const edad = parseInt(edadInput.value);
    
    if (isNaN(edad) || edad <= 0) {
      mostrarMensaje("Por favor, ingrese una edad válida (mayor a 0).", "red");
      return;
    }
    
    data.personas.push({
      nombre: valor,
      edad: edad
    });
    
    mostrarMensaje(`Persona guardada: ${valor} (${edad} años)`, "orange");
    
    if (data.personas.length === 5) {
      etapa = "finalizado";
    }
    
    edadInput.value = '';
  }
  
  DOM.entrada.value = '';
  actualizarUI();
});

// Inicializar la UI
actualizarUI();