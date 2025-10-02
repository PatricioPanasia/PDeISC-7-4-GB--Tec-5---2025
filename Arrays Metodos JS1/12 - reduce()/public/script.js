const data = {
  numeros: [],
  productos: []
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton"),
  estadoInput: document.getElementById("estadoInput")
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
  const li = crearElemento('li', texto, {
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  });

  // Estilos según tipo
  if (tipo === 'suma') {
    li.style.borderLeft = '4px solid #4CAF50';
  } else if (tipo === 'producto') {
    li.style.borderLeft = '4px solid #2196F3';
  } else if (tipo === 'precio') {
    li.style.borderLeft = '4px solid #FF9800';
  } else {
    li.style.borderLeft = '4px solid #4CAF50';
  }

  DOM.lista.appendChild(li);
  return li;
}

// Funciones para las consignas con reduce()
function mostrarSumaNumeros() {
  if (data.numeros.length > 0) {
    const suma = data.numeros.reduce((acum, num) => acum + num, 0);
    crearItemLista(`Suma total: ${suma}`, 'suma');
  }
}

function mostrarProductoNumeros() {
  if (data.numeros.length > 0) {
    const producto = data.numeros.reduce((acum, num) => acum * num, 1);
    crearItemLista(`Producto total: ${producto}`, 'producto');
  }
}

function mostrarTicketCompra() {
  if (data.productos.length > 0) {
    const total = data.productos.reduce((acum, prod) => acum + prod.precio, 0);
    
    // Crear título del ticket
    const titulo = crearElemento('h3', 'Ticket de compra', {
      marginTop: '20px',
      marginBottom: '10px',
      color: '#FF9800'
    });
    DOM.lista.appendChild(titulo);
    
    // Mostrar cada producto
    data.productos.forEach(prod => {
      crearItemLista(`${prod.nombre}: $${prod.precio.toFixed(2)}`, 'precio');
    });
    
    // Mostrar total
    crearItemLista(`Total: $${total.toFixed(2)}`, 'precio');
  }
}

function actualizarUI() {
  if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
  } else if (etapa === "productos") {
    DOM.etiqueta.textContent = "Ingrese nombre del producto:";
    DOM.boton.textContent = data.productos.length < 5 ? "Guardar producto" : "Finalizar";
    DOM.estadoInput.style.display = 'block';
    DOM.estadoInput.innerHTML = `
      <label class="etiqueta-formulario">Precio del producto:</label>
      <input class="input-formulario" type="number" id="precio" step="0.01" min="0" required>
    `;
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado!";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.estadoInput.style.display = 'none';
  }
  
  limpiarLista();
  
  // Mostrar números y resultados
  if (data.numeros.length > 0) {
    const tituloNumeros = crearElemento('h3', 'Números ingresados:', {
      marginTop: '20px',
      marginBottom: '10px',
      color: '#4CAF50'
    });
    DOM.lista.appendChild(tituloNumeros);
    
    data.numeros.forEach(num => {
      crearItemLista(num.toString());
    });
    
    mostrarSumaNumeros();
    mostrarProductoNumeros();
  }
  
  // Mostrar productos y ticket
  if (data.productos.length > 0) {
    mostrarTicketCompra();
  }
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
      etapa = "productos";
    }

  } else if (etapa === "productos") {
    const precioInput = document.getElementById("precio");
    const precio = parseFloat(precioInput.value);
    
    if (isNaN(precio) || precio <= 0) {
      mostrarMensaje("Por favor, ingrese un precio válido.", "red");
      return;
    }
    
    data.productos.push({
      nombre: valor,
      precio: precio
    });
    
    mostrarMensaje(`Producto guardado: ${valor} ($${precio.toFixed(2)})`, "orange");
    
    if (data.productos.length === 5) {
      etapa = "finalizado";
    }
    
    precioInput.value = '';
  }
  
  DOM.entrada.value = '';
  actualizarUI();
});

// Inicializar la UI
actualizarUI();