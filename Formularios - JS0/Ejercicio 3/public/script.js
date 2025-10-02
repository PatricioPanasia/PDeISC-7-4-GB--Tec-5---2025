const formulario = document.getElementById("formulario-persona");
const tieneHijos = document.getElementById("tieneHijos");
const cantidadHijos = document.getElementById("cantidadHijos");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista-personas");

let personas = [];

// ──────── Cargar datos almacenados ────────
window.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("personas");
  if (datosGuardados) {
    personas = JSON.parse(datosGuardados);
    actualizarLista();
  }
});

// ──────── Mostrar campo de hijos dinámicamente ────────
tieneHijos.addEventListener("change", () => {
  cantidadHijos.style.display = tieneHijos.value === "Sí" ? "block" : "none";
});

// ──────── Manejar envío del formulario ────────
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const datos = new FormData(formulario);
  const persona = Object.fromEntries(datos.entries());

  if (persona.tieneHijos === "Sí" && (!persona.cantidadHijos || persona.cantidadHijos <= 0)) {
    mostrarMensaje("Debe ingresar cuántos hijos tiene.", false);
    return;
  }

  personas.push(persona);
  localStorage.setItem("personas", JSON.stringify(personas));

  formulario.reset();
  cantidadHijos.style.display = "none";
  mostrarMensaje("Guardado correctamente ✅", true);
  actualizarLista();
});

// ──────── Mostrar mensaje ────────
function mostrarMensaje(texto, exito) {
  mensaje.textContent = texto;
  mensaje.style.color = exito ? "green" : "red";
}

// ──────── Actualizar lista de nombres ────────
function actualizarLista() {
  lista.innerHTML = "";
  personas.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} ${p.apellido}`;
    lista.appendChild(li);
  });
}

// ──────── Exportar como JSON ────────
function exportarJSON() {
  const dataStr = JSON.stringify(personas, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "personas.json";
  a.click();
  URL.revokeObjectURL(url);
}
