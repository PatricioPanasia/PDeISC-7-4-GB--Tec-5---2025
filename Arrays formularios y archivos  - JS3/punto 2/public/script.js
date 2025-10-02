let numeros = [];

function agregarNumero() {
  const input = document.getElementById('numero');
  const valor = parseInt(input.value);

  if (isNaN(valor)) return;

  if (numeros.length >= 20) {
    document.getElementById('estado').textContent = 'Ya ingresaste el máximo de 20 números.';
    return;
  }

  numeros.push(valor);
  mostrarNumeros();
  input.value = '';
}

function mostrarNumeros() {
  const ul = document.getElementById('lista-numeros');
  ul.innerHTML = '';
  numeros.forEach((num, i) => {
    const li = document.createElement('li');
    li.textContent = `#${i + 1}: ${num}`;
    ul.appendChild(li);
  });

  document.getElementById('estado').textContent = `Total: ${numeros.length} números`;
}

function guardarArchivo() {
  if (numeros.length < 10) {
    document.getElementById('estado').textContent = 'Debe ingresar al menos 10 números antes de guardar.';
    return;
  }

  fetch('/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numeros })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('estado').textContent = data.mensaje || data.error;
    })
    .catch(error => {
      document.getElementById('estado').textContent = 'Error al guardar.';
      console.error(error);
    });
}
