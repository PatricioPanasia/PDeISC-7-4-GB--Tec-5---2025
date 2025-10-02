const data = {
  nombres: [],
  numeros: [],
  personas: []
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton"),
  opciones: document.getElementById("opciones"),
  edadInput: document.getElementById("edadInput")
};

let etapa = "nombres";
let nombreTemp = "";

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarMensaje(texto, color) {
  DOM.mensaje.textContent = texto;
  DOM.mensaje.style.color = color;
}

function mostrarSaludos() {
  if (data.nombres.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Saludos:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.nombres.forEach(nombre => {
      const li = document.createElement('li');
      li.textContent = `¡Hola ${nombre}!`;
      DOM.lista.appendChild(li);
    });
  }
}

function mostrarDobles() {
  if (data.numeros.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Dobles de los números:';
    titulo.style.fontWeight = 'bold';
    titulo.style.marginTop = '20px';
    DOM.lista.appendChild(titulo);
    
    data.numeros.forEach(numero => {
      const li = document.createElement('li');
      li.textContent = `El doble de ${numero} es ${numero * 2}`;
      DOM.lista.appendChild(li);
    });
  }
}

function mostrarPersonas() {
  if (data.personas.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Personas registradas:';
    titulo.style.fontWeight = 'bold';
    titulo.style.marginTop = '20px';
    DOM.lista.appendChild(titulo);
    
    data.personas.forEach(persona => {
      const li = document.createElement('li');
      li.textContent = `${persona.nombre} tiene ${persona.edad} años`;
      DOM.lista.appendChild(li);
    });
  }
}

function actualizarUI() {
  if (etapa === "nombres") {
    DOM.etiqueta.textContent = "Ingrese un nombre:";
    DOM.boton.textContent = data.nombres.length < 5 ? "Guardar nombre" : "Siguiente";
    DOM.opciones.style.display = 'none';
    DOM.entrada.required = true;
    DOM.edadInput.required = false;
  } else if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Siguiente";
    DOM.opciones.style.display = 'none';
    DOM.entrada.required = true;
    DOM.edadInput.required = false;
  } else if (etapa === "personas") {
    DOM.etiqueta.textContent = "Ingrese un nombre:";
    DOM.boton.textContent = data.personas.length < 5 ? "Guardar persona" : "Finalizar";
    DOM.opciones.style.display = 'block';
    DOM.entrada.required = true;
    DOM.edadInput.required = true;
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.opciones.style.display = 'none';
  }
  
  limpiarLista();
  mostrarSaludos();
  mostrarDobles();
  mostrarPersonas();
}

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (etapa === "personas") {
    const nombre = DOM.entrada.value.trim();
    const edad = DOM.edadInput.value.trim();
    
    if (nombre === "" || edad === "") {
      mostrarMensaje("Por favor, complete ambos campos.", "red");
      return;
    }
    
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum <= 0) {
      mostrarMensaje("Por favor, ingrese una edad válida.", "red");
      return;
    }
    
    data.personas.push({nombre: nombre, edad: edadNum});
    mostrarMensaje(`Persona registrada: ${nombre}`, "green");
    
    if (data.personas.length === 5) {
      etapa = "finalizado";
    }
    
    DOM.entrada.value = '';
    DOM.edadInput.value = '';
    
  } else {
    const valor = DOM.entrada.value.trim();

    if (valor === "") {
      mostrarMensaje("Por favor, ingrese un valor.", "red");
      return;
    }

    if (etapa === "nombres") {
      data.nombres.push(valor);
      mostrarMensaje(`¡Hola ${valor}!`, "green");
      
      if (data.nombres.length === 5) {
        etapa = "numeros";
      }

    } else if (etapa === "numeros") {
      const numero = parseInt(valor);
      if (isNaN(numero)) {
        mostrarMensaje("Por favor, ingrese un número válido.", "red");
        return;
      }
      
      data.numeros.push(numero);
      mostrarMensaje(`El doble de ${numero} es ${numero * 2}`, "blue");
      
      if (data.numeros.length === 5) {
        etapa = "personas";
      }
    }
    
    DOM.entrada.value = '';
  }

  actualizarUI();
});

// Inicializar la UI
actualizarUI();