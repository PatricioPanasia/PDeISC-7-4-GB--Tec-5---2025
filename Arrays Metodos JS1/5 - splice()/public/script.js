const data = {
  letras: ['a', 'b', 'c', 'd', 'e'], // Array inicial de letras
  nombres: ['Juan', 'María', 'Carlos'] // Array para operaciones con nombres
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton")
};

let etapa = "eliminar";

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarDatos() {
  // Mostrar array de letras
  const tituloLetras = document.createElement('li');
  tituloLetras.textContent = 'Array de letras:';
  tituloLetras.style.fontWeight = 'bold';
  DOM.lista.appendChild(tituloLetras);
  
  const letrasLi = document.createElement('li');
  letrasLi.textContent = `[${data.letras.join(', ')}]`;
  DOM.lista.appendChild(letrasLi);

  // Mostrar array de nombres
  const tituloNombres = document.createElement('li');
  tituloNombres.textContent = 'Array de nombres:';
  tituloNombres.style.fontWeight = 'bold';
  DOM.lista.appendChild(tituloNombres);
  
  const nombresLi = document.createElement('li');
  nombresLi.textContent = `[${data.nombres.join(', ')}]`;
  DOM.lista.appendChild(nombresLi);
}

function actualizarUI() {
  if (etapa === "eliminar") {
    DOM.etiqueta.textContent = "Presione el botón para eliminar 2 letras desde la posición 1";
    DOM.boton.textContent = "Eliminar letras";
    DOM.entrada.style.display = 'none';
  } else if (etapa === "insertar") {
    DOM.etiqueta.textContent = "Ingrese un nombre para insertar en posición 2:";
    DOM.boton.textContent = "Insertar nombre";
    DOM.entrada.style.display = 'block';
    DOM.entrada.focus();
  } else if (etapa === "reemplazar") {
    DOM.etiqueta.textContent = "Ingrese dos nombres separados por coma para reemplazar:";
    DOM.boton.textContent = "Reemplazar elementos";
    DOM.entrada.style.display = 'block';
    DOM.entrada.focus();
  } else if (etapa === "finalizado") {
    DOM.etiqueta.textContent = "Operaciones completadas";
    DOM.boton.textContent = "Finalizado";
    DOM.entrada.style.display = 'none';
    DOM.boton.disabled = true;
  }
  
  limpiarLista();
  mostrarDatos();
}

function manejarEliminarLetras() {
  // Eliminar 2 elementos desde posición 1
  const eliminados = data.letras.splice(1, 2);
  alert(`Se eliminaron las letras: ${eliminados.join(', ')}`);
  etapa = "insertar";
  actualizarUI();
}

function manejarInsertarNombre() {
  const nombre = DOM.entrada.value.trim();
  if (!nombre) {
    DOM.mensaje.textContent = "Por favor ingrese un nombre";
    DOM.mensaje.style.color = "red";
    return false;
  }
  
  // Insertar en posición 2 sin eliminar nada
  data.nombres.splice(1, 0, nombre);
  DOM.mensaje.textContent = "";
  etapa = "reemplazar";
  actualizarUI();
  return true;
}

function manejarReemplazarNombres() {
  const nombres = DOM.entrada.value.trim().split(',');
  if (nombres.length !== 2 || !nombres[0].trim() || !nombres[1].trim()) {
    DOM.mensaje.textContent = "Ingrese exactamente dos nombres separados por coma";
    DOM.mensaje.style.color = "red";
    return false;
  }
  
  // Reemplazar 2 elementos por nuevos desde posición 1
  const reemplazados = data.nombres.splice(1, 2, nombres[0].trim(), nombres[1].trim());
  alert(`Se reemplazaron los nombres: ${reemplazados.join(', ')}`);
  DOM.mensaje.textContent = "";
  etapa = "finalizado";
  actualizarUI();
  return true;
}

DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if (etapa === "eliminar") {
    manejarEliminarLetras();
  } else if (etapa === "insertar") {
    manejarInsertarNombre();
  } else if (etapa === "reemplazar") {
    manejarReemplazarNombres();
  }
});

// Inicializar la UI
actualizarUI();