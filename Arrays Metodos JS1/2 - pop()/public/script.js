const data = {
  animales: [],
  compras: [],
  eliminados: [],
  tareas: []
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton")
};

let etapa = "animales";

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarDatosActuales() {
  // Mostrar animales existentes
  if (data.animales.length > 0) {
    const tituloAnimales = document.createElement('li');
    tituloAnimales.textContent = 'Animales:';
    tituloAnimales.style.fontWeight = 'bold';
    DOM.lista.appendChild(tituloAnimales);
    
    data.animales.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = `Animal: ${animal}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar compras existentes
  if (data.compras.length > 0) {
    const tituloCompras = document.createElement('li');
    tituloCompras.textContent = 'Compras:';
    tituloCompras.style.fontWeight = 'bold';
    DOM.lista.appendChild(tituloCompras);
    
    data.compras.forEach(compra => {
      const li = document.createElement('li');
      li.textContent = `Objeto: ${compra}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar tareas existentes
  if (data.tareas.length > 0) {
    const tituloTareas = document.createElement('li');
    tituloTareas.textContent = 'Tareas:';
    tituloTareas.style.fontWeight = 'bold';
    DOM.lista.appendChild(tituloTareas);
    
    data.tareas.forEach(tarea => {
      const li = document.createElement('li');
      li.textContent = `Tarea: ${tarea}`;
      DOM.lista.appendChild(li);
    });
  }

  // Mostrar eliminados si existen
  if (data.eliminados.length > 0) {
    const tituloEliminados = document.createElement('li');
    tituloEliminados.textContent = 'Elementos eliminados:';
    tituloEliminados.style.fontWeight = 'bold';
    DOM.lista.appendChild(tituloEliminados);
    
    data.eliminados.forEach(eliminado => {
      const li = document.createElement('li');
      li.textContent = `Eliminado: ${eliminado}`;
      DOM.lista.appendChild(li);
    });
  }
}

function actualizarUI() {
  if (etapa === "animales") {
    DOM.etiqueta.textContent = "Ingrese un animal (de a uno por vez):";
    DOM.boton.textContent = "Guardar animal";
  } else if (etapa === "compras") {
    DOM.etiqueta.textContent = "Ingrese un objeto de la lista de compras:";
    DOM.boton.textContent = "Guardar objeto";
  } else if (etapa === "tareas") {
    DOM.etiqueta.textContent = "Ingrese una tarea para la lista:";
    DOM.boton.textContent = "Guardar tarea";
  } else if (etapa === "confirmarVaciado") {
    DOM.etiqueta.textContent = "¿Desea vaciar la lista de tareas? (sí/no):";
    DOM.boton.textContent = "Confirmar";
  }
  
  // Limpiar y mostrar datos actuales
  limpiarLista();
  mostrarDatosActuales();
}

function mostrarElementoEliminado(elemento, tipo) {
  const li = document.createElement("li");
  li.textContent = `Eliminado (${tipo}): ${elemento}`;
  li.style.color = 'red';
  DOM.lista.appendChild(li);
}

function vaciarArrayConWhile(array) {
  const liTitulo = document.createElement("li");
  liTitulo.textContent = "Vaciando array con while + pop():";
  liTitulo.style.fontWeight = "bold";
  DOM.lista.appendChild(liTitulo);

  while (array.length > 0) {
    const eliminado = array.pop();
    const li = document.createElement("li");
    li.textContent = `Elemento eliminado: ${eliminado}`;
    li.style.color = 'red';
    DOM.lista.appendChild(li);
  }
}

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = DOM.entrada.value.trim().toLowerCase();

  if (valor === "") {
    DOM.mensaje.textContent = "Por favor, ingrese un valor.";
    DOM.mensaje.style.color = "red";
    return;
  }

  DOM.mensaje.textContent = "";
  
  if (etapa === "animales") {
    data.animales.push(valor);
    
    if (data.animales.length === 5) {
      const eliminado = data.animales.pop();
      data.eliminados.push(eliminado);
      etapa = "compras";
    }

  } else if (etapa === "compras") {
    data.compras.push(valor);
    
    if (data.compras.length === 5) {
      const eliminado = data.compras.pop();
      data.eliminados.push(eliminado);
      etapa = "tareas";
    }

  } else if (etapa === "tareas") {
    data.tareas.push(valor);
    
    if (data.tareas.length === 5) {
      etapa = "confirmarVaciado";
    }

  } else if (etapa === "confirmarVaciado") {
    if (valor === "sí" || valor === "si") {
      vaciarArrayConWhile(data.tareas);
      DOM.mensaje.textContent = "Lista de tareas vaciada.";
      DOM.mensaje.style.color = "green";
    } else {
      const li = document.createElement("li");
      li.textContent = "Lista de tareas conservada.";
      li.style.fontWeight = "bold";
      DOM.lista.appendChild(li);
      DOM.mensaje.textContent = "No se vació la lista.";
      DOM.mensaje.style.color = "blue";
    }

    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.boton.textContent = "Finalizado";
    actualizarUI();
    DOM.formulario.reset();
    return;
  }

  actualizarUI();
  DOM.formulario.reset();
});

// Inicializar la UI
actualizarUI();