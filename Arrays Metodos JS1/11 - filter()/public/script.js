const data = {
  numeros: [],
  palabras: [],
  usuarios: []
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
  titulo.style.marginBottom = '10px';
  titulo.style.listStyle = 'none';
  DOM.lista.appendChild(titulo);
  return titulo;
}

function crearItemLista(texto, tipo = 'normal') {
  const li = document.createElement('li');
  li.textContent = texto;
  li.style.marginBottom = '8px';
  li.style.padding = '8px';
  li.style.borderRadius = '4px';
  li.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  
  if (tipo === 'mayor') {
    li.style.borderLeft = '4px solid #4CAF50';
  } else if (tipo === 'menor') {
    li.style.borderLeft = '4px solid #f44336';
  } else if (tipo === 'activo') {
    li.style.borderLeft = '4px solid #4CAF50';
  } else if (tipo === 'inactivo') {
    li.style.borderLeft = '4px solid #f44336';
  }
  
  DOM.lista.appendChild(li);
  return li;
}

function mostrarNumerosFiltrados() {
  if (data.numeros.length > 0) {
    crearTituloLista('Números ingresados:');
    
    const mayores = data.numeros.filter(numero => numero > 10);
    const menores = data.numeros.filter(numero => numero <= 10);
    
    if (mayores.length > 0) {
      crearTituloLista('→ Mayores a 10:');
      mayores.forEach(numero => {
        crearItemLista(numero.toString(), 'mayor');
      });
    }
    
    if (menores.length > 0) {
      crearTituloLista('→ Menores o iguales a 10:');
      menores.forEach(numero => {
        crearItemLista(numero.toString(), 'menor');
      });
    }
  }
}

function mostrarPalabrasFiltradas() {
  if (data.palabras.length > 0) {
    crearTituloLista('Palabras ingresadas:');
    
    const largas = data.palabras.filter(palabra => palabra.length > 5);
    const cortas = data.palabras.filter(palabra => palabra.length <= 5);
    
    if (largas.length > 0) {
      crearTituloLista('→ Más de 5 letras:');
      largas.forEach(palabra => {
        crearItemLista(`${palabra} (${palabra.length} letras)`, 'mayor');
      });
    }
    
    if (cortas.length > 0) {
      crearTituloLista('→ 5 letras o menos:');
      cortas.forEach(palabra => {
        crearItemLista(`${palabra} (${palabra.length} letras)`, 'menor');
      });
    }
  }
}

function mostrarUsuariosFiltrados() {
  if (data.usuarios.length > 0) {
    crearTituloLista('Usuarios ingresados:');
    
    const activos = data.usuarios.filter(usuario => usuario.activo);
    const inactivos = data.usuarios.filter(usuario => !usuario.activo);
    
    if (activos.length > 0) {
      crearTituloLista('→ Usuarios activos:');
      activos.forEach(usuario => {
        crearItemLista(usuario.nombre, 'activo');
      });
    }
    
    if (inactivos.length > 0) {
      crearTituloLista('→ Usuarios inactivos:');
      inactivos.forEach(usuario => {
        crearItemLista(usuario.nombre, 'inactivo');
      });
    }
  }
}

function actualizarUI() {
  if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número:";
    DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
    DOM.entrada.required = true;
  } else if (etapa === "palabras") {
    DOM.etiqueta.textContent = "Ingrese una palabra:";
    DOM.boton.textContent = data.palabras.length < 5 ? "Guardar palabra" : "Siguiente";
    DOM.estadoInput.style.display = 'none';
    DOM.entrada.required = true;
  } else if (etapa === "usuarios") {
    DOM.etiqueta.textContent = "Ingrese nombre de usuario:";
    DOM.boton.textContent = data.usuarios.length < 5 ? "Guardar usuario" : "Finalizar";
    DOM.estadoInput.style.display = 'block';
    DOM.entrada.required = true;
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Proceso completado!";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.estadoInput.style.display = 'none';
  }
  
  limpiarLista();
  mostrarNumerosFiltrados();
  mostrarPalabrasFiltradas();
  mostrarUsuariosFiltrados();
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
      etapa = "usuarios";
    }

  } else if (etapa === "usuarios") {
    const estado = document.querySelector('input[name="estado"]:checked');
    if (!estado) {
      mostrarMensaje("Por favor, seleccione un estado (activo/inactivo).", "red");
      return;
    }
    
    const usuario = {
      nombre: valor,
      activo: estado.value === "activo"
    };
    
    data.usuarios.push(usuario);
    mostrarMensaje(`Usuario guardado: ${valor} (${estado.value})`, "purple");
    
    if (data.usuarios.length === 5) {
      etapa = "finalizado";
    }
  }
  
  DOM.entrada.value = '';
  actualizarUI();
});

// Inicializar la UI
actualizarUI();