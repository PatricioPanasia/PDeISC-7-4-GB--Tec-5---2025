function irAPagina(a) {
  window.location.href = a;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.formulario-form');

  const nombreInput = document.getElementById('nombre');
  const deporteInput = document.getElementById('deporte');
  const tiempoInput = document.getElementById('tiempo');
  const sensacionInput = document.getElementById('sensacion');
  const resultadoDiv = document.getElementById('resultado');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío real del formulario

    const nombre = nombreInput.value.trim();
    const deporte = deporteInput.value.trim();
    const tiempo = tiempoInput.value.trim();
    const sensacion = sensacionInput.value.trim();

    // Validación básica
    if (!nombre || !deporte || !tiempo || !sensacion) {
      resultadoDiv.textContent = "Por favor completá todos los campos.";
      resultadoDiv.style.color = "red";
      return;
    }

    // Crear mensaje con los datos
    const mensaje = `Hola ${nombre}, mencionaste que practicaste ${deporte} durante ${tiempo} y que te sentías ${sensacion} después de hacerlo. ¡Gracias por compartir!`;

    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.color = "green";

    // Opcional: Limpiar formulario
    form.reset();
  });
});
