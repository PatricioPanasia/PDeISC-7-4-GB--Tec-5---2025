const data = {
  mascotas: [],
  numerosAleatorios: [],
  ciudades: []
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

let etapa = "mascotas";

function limpiarLista() {
  DOM.lista.innerHTML = '';
}

function mostrarDatosActuales() {
  // Mostrar mascotas ingresadas y verificar si está "perro"
  if (data.mascotas.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Mascotas ingresadas:';
    titulo.style.fontWeight = 'bold';
    DOM.lista.appendChild(titulo);
    
    data.mascotas.forEach((mascota, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${mascota}`;
      DOM.lista.appendChild(li);
    });

    // Verificar si está "perro"
    const posicionPerro = data.mascotas.indexOf("perro");
    const resultadoPerro = document.createElement('li');
    resultadoPerro.style.marginTop = '10px';
    
    if (posicionPerro !== -1) {
      resultadoPerro.textContent = `✅ "perro" encontrado en la posición ${posicionPerro + 1}`;
      resultadoPerro.style.color = 'green';
    } else {
      resultadoPerro.textContent = `❌ "perro" no se encuentra en la lista`;
      resultadoPerro.style.color = 'red';
    }
    DOM.lista.appendChild(resultadoPerro);
  }

  // Mostrar números aleatorios y verificar si está el 50
  if (data.numerosAleatorios.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Números aleatorios generados:';
    titulo.style.fontWeight = 'bold';
    titulo.style.marginTop = '20px';
    DOM.lista.appendChild(titulo);
    
    data.numerosAleatorios.forEach((num, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${num}`;
      if (num === 50) {
        li.style.color = 'blue';
        li.style.fontWeight = 'bold';
      }
      DOM.lista.appendChild(li);
    });

    // Verificar si está el 50
    const posicion50 = data.numerosAleatorios.indexOf(50);
    const resultado50 = document.createElement('li');
    resultado50.style.marginTop = '10px';
    
    if (posicion50 !== -1) {
      resultado50.textContent = `✅ El número 50 está en la posición ${posicion50 + 1}`;
      resultado50.style.color = 'green';
    } else {
      resultado50.textContent = `❌ El número 50 no está en la lista`;
      resultado50.style.color = 'red';
    }
    DOM.lista.appendChild(resultado50);
  }

  // Mostrar ciudades ingresadas y verificar si está "Madrid"
  if (data.ciudades.length > 0) {
    const titulo = document.createElement('li');
    titulo.textContent = 'Ciudades ingresadas:';
    titulo.style.fontWeight = 'bold';
    titulo.style.marginTop = '20px';
    DOM.lista.appendChild(titulo);
    
    data.ciudades.forEach((ciudad, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${ciudad}`;
      DOM.lista.appendChild(li);
    });

    // Verificar si está "Madrid"
    const posicionMadrid = data.ciudades.indexOf("Madrid");
    const resultadoMadrid = document.createElement('li');
    resultadoMadrid.style.marginTop = '10px';
    
    if (posicionMadrid !== -1) {
      resultadoMadrid.textContent = `✅ "Madrid" encontrada en la posición ${posicionMadrid + 1}`;
      resultadoMadrid.style.color = 'green';
    } else {
      resultadoMadrid.textContent = `❌ "Madrid" no se encuentra en la lista`;
      resultadoMadrid.style.color = 'red';
    }
    DOM.lista.appendChild(resultadoMadrid);
  }
}

function actualizarUI() {
  if (etapa === "mascotas") {
    DOM.etiqueta.textContent = "Ingrese una mascota común:";
    DOM.boton.textContent = data.mascotas.length < 5 ? "Guardar mascota" : "Siguiente";
    DOM.opciones.style.display = 'none';
  } else if (etapa === "numeros") {
    DOM.etiqueta.textContent = "Ingrese un número del 0 al 20 (intente adivinar la posición del 50):";
    DOM.boton.textContent = "Verificar";
    DOM.opciones.style.display = 'none';
    generarNumerosAleatorios();
  } else if (etapa === "ciudades") {
    DOM.etiqueta.textContent = "Ingrese 5 ciudades de España:";
    DOM.boton.textContent = data.ciudades.length < 5 ? "Guardar ciudad" : "Finalizar";
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

function generarNumerosAleatorios() {
  if (data.numerosAleatorios.length === 0) {
    for (let i = 0; i < 20; i++) {
      data.numerosAleatorios.push(Math.floor(Math.random() * 100) + 1);
    }
  }
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
  
  if (etapa === "mascotas") {
    data.mascotas.push(valor.toLowerCase());
    
    if (data.mascotas.length === 6) {
      etapa = "numeros";
    }

  } else if (etapa === "numeros") {
    const intento = parseInt(valor);
    if (isNaN(intento) || intento < 0 || intento > 20) {
      DOM.mensaje.textContent = "Por favor, ingrese un número válido entre 0 y 20.";
      DOM.mensaje.style.color = "red";
      return;
    }
    
    const posicion50 = data.numerosAleatorios.indexOf(50);
    const resultado = document.createElement('li');
    resultado.style.marginTop = '10px';
    
    if (posicion50 !== -1) {
      if (intento === posicion50 + 1) {
        resultado.textContent = `🎉 ¡Correcto! El 50 está en la posición ${posicion50 + 1}`;
        resultado.style.color = 'green';
      } else {
        resultado.textContent = `❌ Incorrecto. El 50 está en la posición ${posicion50 + 1}, no en la ${intento}`;
        resultado.style.color = 'orange';
      }
    } else {
      resultado.textContent = `ℹ️ El número 50 no está en la lista aleatoria`;
      resultado.style.color = 'blue';
    }
    DOM.lista.appendChild(resultado);
    
    etapa = "ciudades";

  } else if (etapa === "ciudades") {
    data.ciudades.push(valor);
    
    if (data.ciudades.length === 5) {
      etapa = "finalizado";
    }
  }

  actualizarUI();
  DOM.formulario.reset();
});

// Inicializar la UI
actualizarUI();