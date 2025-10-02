function irAPagina(a) {
    window.location.href = a;
  }
 document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const datos = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    email: form.email.value,
    edad: form.edad.value,
    genero: form.genero.value,
    pais: form.pais.value,
    intereses: Array.from(form.querySelectorAll("input[name='intereses']:checked"))
      .map(el => el.value)
  };

  const resultado = `
👤 Nombre completo: ${datos.nombre} ${datos.apellido}
📧 Correo: ${datos.email}
🎂 Edad: ${datos.edad}
🚻 Género: ${datos.genero}
🌍 País: ${datos.pais}
🎯 Intereses: ${datos.intereses.join(", ") || "Ninguno"}
`;

  document.getElementById("resultado").textContent = resultado;

  form.reset(); // Limpia el formulario si querés
});
