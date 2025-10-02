const data = {
  numeros: [],
  peliculas: [],
  copiaNumeros: [],
  copiaPeliculas: [],
  ultimosElementos: [] // Aquí guardaremos los elementos copiados (números + películas)
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

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarDatosActuales() {
  // Mostrar números originales
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

  // Mostrar películas originales
  if (data.peliculas.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Películas ingresadas:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.peliculas.forEach((pelicula, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${pelicula}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar primeros 3 números (slice)
  if (data.copiaNumeros.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Primeros 3 números (slice):';
    titulo.style.fontWeight = 'bold';
    titulo.style.color = 'green';
    DOM.lista.appendChild(titulo);
    
    data.copiaNumeros.forEach(num => {
      const li = document.createElement('li');
      li.textContent = `Número: ${num}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar películas de posición 2 a 4 (slice)
  if (data.copiaPeliculas.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Películas de la posición 2 a la 4 (slice):';
    titulo.style.fontWeight = 'bold';
    titulo.style.color = 'green';
    DOM.lista.appendChild(titulo);
    
    data.copiaPeliculas.forEach((pelicula, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${pelicula}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar array final con elementos copiados
  if (data.ultimosElementos.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Array final (elementos copiados):';
    titulo.style.fontWeight = 'bold';
    titulo.style.color = 'blue';
    DOM.lista.appendChild(titulo);
    
    data.ultimosElementos.forEach((elemento, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${elemento}`;
      DOM.lista.appendChild(li);
    });
  }
}

function actualizarUI() {
  if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = "Guardar número";
    DOM.opciones.style.display = 'none';
  } else if (etapa === "peliculas") {
    DOM.etiqueta.textContent = "Ingrese una película:";
    DOM.boton.textContent = "Guardar película";
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

function aplicarSlice() {
  // 1. Copiar primeros 3 números
  data.copiaNumeros = data.numeros.slice(0, 3);
  
  // 2. Copiar películas de posición 2 a 4 (índices 1 a 3)
  data.copiaPeliculas = data.peliculas.slice(1, 4);
  
  // 3. Guardar en "ultimosElementos" los números y películas copiadas
  data.ultimosElementos = [...data.copiaNumeros, ...data.copiaPeliculas];
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
      etapa = "peliculas";
    }

  } else if (etapa === "peliculas") {
    data.peliculas.push(valor);
    
    if (data.peliculas.length === 5) {
      aplicarSlice();
      etapa = "finalizado";
    }
  }

  actualizarUI();
  DOM.formulario.reset();
});

// Inicializar la UI
actualizarUI();