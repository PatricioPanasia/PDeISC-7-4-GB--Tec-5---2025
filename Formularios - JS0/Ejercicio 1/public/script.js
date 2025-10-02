function irAPagina(a) {
  window.location.href = a;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.formulario-form');
  const usuarioInput = document.getElementById('usuario');
  const contrasenaInput = document.getElementById('contrasena');

  // Crear contenedores de mensajes si no existen
  const mensajeUsuario = document.createElement('p');
  mensajeUsuario.style.color = 'red';
  usuarioInput.parentElement.appendChild(mensajeUsuario);

  const mensajeContrasena = document.createElement('p');
  mensajeContrasena.style.color = 'red';
  contrasenaInput.parentElement.appendChild(mensajeContrasena);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value;

    let esValido = true;

    // Validación para el usuario
    const usuarioRegex = /^[A-Za-z]{1,30}$/;
    if (!usuarioRegex.test(usuario)) {
      mensajeUsuario.textContent = "El nombre de usuario solo debe contener letras (sin espacios, números ni símbolos), y hasta 30 caracteres.";
      esValido = false;
    } else {
      mensajeUsuario.textContent = "";
    }

    // Validación para la contraseña
    const contrasenaRegex = /^[^\s]{8,30}$/;
    if (!contrasenaRegex.test(contrasena)) {
      mensajeContrasena.textContent = "La contraseña debe tener entre 8 y 30 caracteres y no debe contener espacios.";
      esValido = false;
    } else {
      mensajeContrasena.textContent = "";
    }

    if (esValido) {
      alert(`Inicio de sesión exitoso como ${usuario}`);
      // Aquí podrías enviar los datos al servidor con fetch si querés
    }
  });
});
