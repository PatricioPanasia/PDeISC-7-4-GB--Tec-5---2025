const enlaces = [];

function crearEnlace() {
  const texto = document.getElementById('linkName').value.trim();
  const href = document.getElementById('linkHref').value.trim();
  const lista = document.getElementById('listaEnlaces');
  const selector = document.getElementById('enlaceSelector');

  if (!texto || !href) {
    alert('Debes ingresar texto y URL.');
    return;
  }

  const a = document.createElement('a');
  a.href = href;
  a.textContent = texto;
  a.target = '_blank';
  a.className = 'enlace';
  lista.appendChild(a);

  enlaces.push(a);

  const option = document.createElement('option');
  option.value = enlaces.length - 1;
  option.textContent = texto;
  selector.appendChild(option);

  document.getElementById('linkName').value = '';
  document.getElementById('linkHref').value = '';
}

function modificarEnlace() {
  const selector = document.getElementById('enlaceSelector');
  const nuevoTexto = document.getElementById('nuevoTexto').value.trim();
  const nuevaHref = document.getElementById('nuevaHref').value.trim();
  const registro = document.getElementById('registroCambios');

  const index = parseInt(selector.value);
  const enlace = enlaces[index];

  const cambios = [];

  if (nuevoTexto) {
    cambios.push(`Texto cambiado de "${enlace.textContent}" a "${nuevoTexto}"`);
    enlace.textContent = nuevoTexto;
    selector.options[index].textContent = nuevoTexto;
  }

  if (nuevaHref) {
    cambios.push(`URL cambiada de "${enlace.href}" a "${nuevaHref}"`);
    enlace.href = nuevaHref;
  }

  if (cambios.length === 0) {
    alert('Debes ingresar un nuevo texto o una nueva URL.');
    return;
  }

  const li = document.createElement('li');
  li.textContent = cambios.join(' | ');
  registro.appendChild(li);

  document.getElementById('nuevoTexto').value = '';
  document.getElementById('nuevaHref').value = '';
}
