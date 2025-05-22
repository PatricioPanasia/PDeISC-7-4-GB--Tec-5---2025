const data = {
  numeros: [],
  mensajes: [],
  colaAtencion: []
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton"),
  opciones: document.getElementById("opciones")
};

let etapa = "numeros";
let shiftEjecutado = {
  numeros: false,
  mensajes: false,
  colaAtencion: false
};

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarDatosActuales() {
  // Mostrar números
  if (data.numeros.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Números ingresados:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.numeros.forEach(num => {
      const li = document.createElement('li');
      li.textContent = `Número: ${num}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar mensajes
  if (data.mensajes.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Mensajes de chat:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.mensajes.forEach((msg, index) => {
      const li = document.createElement('li');
      li.textContent = `Mensaje ${index + 1}: ${msg}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar cola de atención
  if (data.colaAtencion.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Cola de atención al cliente:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.colaAtencion.forEach((cliente, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${cliente}`;
      DOM.lista.appendChild(li);
    });
  }
}

function actualizarUI() {
  if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = "Guardar número";
    DOM.opciones.style.display = 'none';
  } else if (etapa === "mensajes") {
    DOM.etiqueta.textContent = `Cree un mensaje para el número ${data.numeros[data.mensajes.length]}:`;
    DOM.boton.textContent = "Guardar mensaje";
    DOM.opciones.style.display = 'none';
  } else if (etapa === "cola") {
    DOM.etiqueta.textContent = "Ingrese nombre para la cola de atención:";
    DOM.boton.textContent = "Agregar a cola";
    DOM.opciones.style.display = 'none';
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.opciones.style.display = 'none';
  }
  
  limpiarLista();
  mostrarDatosActuales();
}

function manejarShift(tipo) {
  if (!shiftEjecutado[tipo] && data[tipo].length > 0) {
    const elementoEliminado = data[tipo].shift();
    alert(`Se eliminó el primer elemento (${elementoEliminado}) del array ${tipo} usando shift()`);
    shiftEjecutado[tipo] = true;
    return true;
  }
  return false;
}

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = DOM.entrada.value.trim();

  if (valor === "") {
    DOM.mensaje.textContent = "Por favor, ingrese un valor.";
    DOM.mensaje.style.color = "red";
    return;
  }

  DOM.mensaje.textContent = "";
  
  if (etapa === "numeros") {
    data.numeros.push(Number(valor));
    
    if (data.numeros.length === 5) {
      etapa = "mensajes";
    }

  } else if (etapa === "mensajes") {
    data.mensajes.push(valor);
    
    if (data.mensajes.length === data.numeros.length) {
      // Eliminar el primer número y mensaje usando shift (solo una vez)
      manejarShift("numeros");
      manejarShift("mensajes");
      etapa = "cola";
    }

  } else if (etapa === "cola") {
    data.colaAtencion.push(valor);
    
    if (data.colaAtencion.length === 3) {
      // Simular atención al cliente con shift (solo una vez)
      manejarShift("colaAtencion");
      etapa = "finalizado";
    }
  }

  actualizarUI();
  DOM.formulario.reset();
});

// Inicializar la UI
actualizarUI();