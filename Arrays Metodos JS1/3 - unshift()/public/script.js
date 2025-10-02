const data = {
  colores: [],
  tareas: [],
  usuarios: []
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

// Lista de colores válidos (puedes ampliarla)
const coloresValidos = [
  'rojo', 'azul', 'verde', 'amarillo', 'naranja', 
  'rosa', 'morado', 'marron', 'negro', 'blanco',
  'gris', 'celeste', 'turquesa', 'violeta', 'beige',
  'dorado', 'plateado', 'coral', 'ocre', 'magenta'
];

let etapa = "colores";

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarDatosActuales() {
  // Mostrar colores
  if (data.colores.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Colores:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.colores.forEach(color => {
      const li = document.createElement('li');
      li.textContent = `Color: ${color}`;
      li.style.color = color.toLowerCase(); // Muestra el texto en el color ingresado
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar tareas
  if (data.tareas.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Tareas:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.tareas.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `Tarea: ${tarea.texto} (${tarea.tipo})`;
      if (tarea.tipo === 'urgente') {
        li.style.color = 'red';
        li.style.fontWeight = 'bold';
      }
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar usuarios
  if (data.usuarios.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Usuarios conectados:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = `Usuario: ${usuario}`;
      DOM.lista.appendChild(li);
    });
  }
}

function validarColor(color) {
  // Verificar si es un color válido
  if (!coloresValidos.includes(color.toLowerCase())) {
    DOM.mensaje.textContent = `"${color}" no es un color válido. Intente con: ${coloresValidos.join(', ')}`;
    DOM.mensaje.style.color = "red";
    return false;
  }
  
  // Verificar si el color ya existe
  if (data.colores.map(c => c.toLowerCase()).includes(color.toLowerCase())) {
    DOM.mensaje.textContent = `"${color}" ya fue ingresado. Elija otro color.`;
    DOM.mensaje.style.color = "red";
    return false;
  }
  
  return true;
}

function actualizarUI() {
  // Ocultar/mostrar elementos según la etapa
  if (etapa === "colores") {
    DOM.etiqueta.textContent = `Ingrese un color (${data.colores.length + 1}/3):`;
    DOM.boton.textContent = "Guardar color";
    DOM.opciones.style.display = 'none';
  } else if (etapa === "tareas") {
    DOM.etiqueta.textContent = "Ingrese una tarea:";
    DOM.boton.textContent = "Guardar tarea";
    DOM.opciones.style.display = 'block';
  } else if (etapa === "usuarios") {
    DOM.etiqueta.textContent = data.usuarios.length < 5 
      ? `Ingrese usuario ${data.usuarios.length + 1}/5:` 
      : "Ingrese el usuario más reciente (irá al principio):";
    DOM.boton.textContent = "Guardar usuario";
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

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = DOM.entrada.value.trim();

  if (valor === "") {
    DOM.mensaje.textContent = "Por favor, ingrese un valor.";
    DOM.mensaje.style.color = "red";
    return;
  }

  DOM.mensaje.textContent = "";
  
  if (etapa === "colores") {
    // Validar el color antes de agregarlo
    if (!validarColor(valor)) {
      return;
    }
    
    // Usamos unshift para agregar al principio
    data.colores.unshift(valor);
    
    if (data.colores.length === 3) {
      DOM.mensaje.textContent = "¡3 colores agregados! Ahora puede ingresar tareas.";
      DOM.mensaje.style.color = "green";
      etapa = "tareas";
    }

  } else if (etapa === "tareas") {
    const tipoTarea = document.getElementById("tipoTarea").value;
    const tarea = {
      texto: valor,
      tipo: tipoTarea
    };
    
    // Si es urgente, va al principio con unshift
    if (tipoTarea === 'urgente') {
      data.tareas.unshift(tarea);
      DOM.mensaje.textContent = "¡Tarea urgente agregada al principio!";
      DOM.mensaje.style.color = "red";
    } else {
      data.tareas.push(tarea);
      DOM.mensaje.textContent = "Tarea normal agregada.";
      DOM.mensaje.style.color = "green";
    }
    
    if (data.tareas.length === 5) {
      DOM.mensaje.textContent = "5 tareas agregadas. Ahora ingrese usuarios.";
      DOM.mensaje.style.color = "green";
      etapa = "usuarios";
    }

  } else if (etapa === "usuarios") {
    if (data.usuarios.length < 5) {
      data.usuarios.push(valor);
      DOM.mensaje.textContent = `Usuario ${data.usuarios.length}/5 agregado.`;
      DOM.mensaje.style.color = "green";
    } else {
      // El sexto usuario va al principio con unshift
      data.usuarios.unshift(valor);
      DOM.mensaje.textContent = "¡Usuario reciente agregado al principio!";
      DOM.mensaje.style.color = "green";
      etapa = "finalizado";
    }
  }

  actualizarUI();
  DOM.formulario.reset();
});

// Inicializar la UI
actualizarUI();