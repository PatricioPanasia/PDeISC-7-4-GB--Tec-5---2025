const data = {
  numeros: [],
  nombres: [],
  precios: []
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

let etapa = "numeros";

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarMensaje(texto, color) {
  DOM.mensaje.textContent = texto;
  DOM.mensaje.style.color = color;
}

function crearTituloLista(texto) {
  const titulo = document.createElement('li');
  titulo.textContent = texto;
  titulo.style.fontWeight = 'bold';
  titulo.style.marginTop = '20px';
  DOM.lista.appendChild(titulo);
  return titulo;
}

function mostrarTriples() {
  if (data.numeros.length > 0) {
    crearTituloLista('Números multiplicados por 3:');
    
    const triples = data.numeros.map(numero => numero * 3);
    triples.forEach((triple, index) => {
      const li = document.createElement('li');
      li.textContent = `El triple de ${data.numeros[index]} es ${triple}`;
      DOM.lista.appendChild(li);
    });
  }
}

function mostrarNombresMayusculas() {
  if (data.nombres.length > 0) {
    crearTituloLista('Nombres en mayúsculas:');
    
    const mayusculas = data.nombres.map(nombre => nombre.toUpperCase());
    mayusculas.forEach((nombre, index) => {
      const li = document.createElement('li');
      li.textContent = `${data.nombres[index]} → ${nombre}`;
      DOM.lista.appendChild(li);
    });
  }
}

function mostrarPreciosConIVA() {
  if (data.precios.length > 0) {
    crearTituloLista('Precios con IVA (21%):');
    
    const preciosConIVA = data.precios.map(precio => {
      const iva = precio * 0.21;
      return parseFloat((precio + iva).toFixed(2));
    });
    
    preciosConIVA.forEach((precioFinal, index) => {
      const li = document.createElement('li');
      li.textContent = `Precio original: $${data.precios[index]} → PRECIO FINAL CON IVA AGREGADO: $${precioFinal}`;
      DOM.lista.appendChild(li);
    });
  }
}

function actualizarUI() {
  if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Siguiente";
    DOM.opciones.style.display = 'none';
    DOM.entrada.required = true;
    DOM.edadInput.required = false;
  } else if (etapa === "nombres") {
    DOM.etiqueta.textContent = "Ingrese un nombre:";
    DOM.boton.textContent = data.nombres.length < 5 ? "Guardar nombre" : "Siguiente";
    DOM.opciones.style.display = 'none';
    DOM.entrada.required = true;
    DOM.edadInput.required = false;
  } else if (etapa === "precios") {
    DOM.etiqueta.textContent = "Ingrese un precio:";
    DOM.boton.textContent = data.precios.length < 5 ? "Guardar precio" : "Finalizar";
    DOM.opciones.style.display = 'none';
    DOM.entrada.required = true;
    DOM.edadInput.required = false;
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.opciones.style.display = 'none';
  }
  
  limpiarLista();
  mostrarTriples();
  mostrarNombresMayusculas();
  mostrarPreciosConIVA();
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
      etapa = "nombres";
    }

  } else if (etapa === "nombres") {
    data.nombres.push(valor);
    mostrarMensaje(`Nombre guardado: ${valor}`, "blue");
    
    if (data.nombres.length === 5) {
      etapa = "precios";
    }

  } else if (etapa === "precios") {
    const precio = parseFloat(valor);
    if (isNaN(precio) || precio <= 0) {
      mostrarMensaje("Por favor, ingrese un precio válido.", "red");
      return;
    }
    
    data.precios.push(precio);
    mostrarMensaje(`Precio guardado: $${precio}`, "purple");
    
    if (data.precios.length === 5) {
      etapa = "finalizado";
    }
  }
  
  DOM.entrada.value = '';
  actualizarUI();
});

// Inicializar la UI
actualizarUI();