
    const data = {
      palabras: [],
      colores: [],
      numeros: []
    };

    const DOM = {
      formulario: document.getElementById("formulario"),
      entrada: document.getElementById("entrada"),
      lista: document.getElementById("lista"),
      mensaje: document.getElementById("mensaje"),
      etiqueta: document.getElementById("etiquetaInput"),
      boton: document.getElementById("boton")
    };

    let etapa = "palabras";
    const coloresValidos = ["rojo", "verde", "azul", "amarillo", "naranja", "rosa", "morado", "blanco", "negro", "gris"];

    function limpiarLista() {
      DOM.lista.innerHTML = '';
    }

    function mostrarMensaje(texto, color) {
      DOM.mensaje.textContent = texto;
      DOM.mensaje.style.color = color;
    }

    function mostrarResultadoBusqueda(array, elemento, tipo) {
      const resultado = document.createElement('li');
      resultado.style.marginTop = '10px';
      
      if (array.includes(elemento)) {
        resultado.textContent = `✅ "${elemento}" encontrado en la lista de ${tipo}`;
        resultado.style.color = 'green';
      } else {
        resultado.textContent = `❌ "${elemento}" no se encuentra en la lista de ${tipo}`;
        resultado.style.color = 'red';
      }
      DOM.lista.appendChild(resultado);
    }

    function mostrarDatosActuales() {
      // Mostrar palabras ingresadas y verificar si está "admin"
      if (data.palabras.length > 0) {
        const titulo = document.createElement('li');
        titulo.textContent = 'Palabras ingresadas:';
        titulo.style.fontWeight = 'bold';
        DOM.lista.appendChild(titulo);
        
        data.palabras.forEach((palabra, index) => {
          const li = document.createElement('li');
          li.textContent = `${index + 1}. ${palabra}`;
          DOM.lista.appendChild(li);
        });

        if (data.palabras.length === 5) {
          mostrarResultadoBusqueda(data.palabras, "admin", "palabras");
        }
      }

      // Mostrar colores ingresados y verificar si está "verde"
      if (data.colores.length > 0) {
        const titulo = document.createElement('li');
        titulo.textContent = 'Colores ingresados:';
        titulo.style.fontWeight = 'bold';
        titulo.style.marginTop = '20px';
        DOM.lista.appendChild(titulo);
        
        data.colores.forEach((color, index) => {
          const li = document.createElement('li');
          li.textContent = `${index + 1}. ${color}`;
          DOM.lista.appendChild(li);
        });

        if (data.colores.length === 5) {
          mostrarResultadoBusqueda(data.colores, "verde", "colores");
        }
      }

      // Mostrar números ingresados
      if (data.numeros.length > 0) {
        const titulo = document.createElement('li');
        titulo.textContent = 'Números ingresados:';
        titulo.style.fontWeight = 'bold';
        titulo.style.marginTop = '20px';
        DOM.lista.appendChild(titulo);
        
        data.numeros.forEach((num, index) => {
          const li = document.createElement('li');
          li.textContent = `${index + 1}. ${num}`;
          DOM.lista.appendChild(li);
        });
      }
    }

    function actualizarUI() {
      if (etapa === "palabras") {
        DOM.etiqueta.textContent = "Ingrese una palabra:";
        DOM.boton.textContent = data.palabras.length < 5 ? "Guardar palabra" : "Siguiente";
      } else if (etapa === "colores") {
        DOM.etiqueta.textContent = "Ingrese un color:";
        DOM.boton.textContent = data.colores.length < 5 ? "Guardar color" : "Siguiente";
      } else if (etapa === "numeros") {
        DOM.etiqueta.textContent = "Ingrese un número:";
        DOM.boton.textContent = data.numeros.length < 5 ? "Guardar número" : "Finalizar";
      } else if (etapa === "finalizado") {
        DOM.etiqueta.textContent = "Proceso completado";
        DOM.boton.textContent = "Finalizado";
        DOM.entrada.disabled = true;
        DOM.boton.disabled = true;
      }
      
      limpiarLista();
      mostrarDatosActuales();
    }

    DOM.formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      const valor = DOM.entrada.value.trim().toLowerCase();

      if (valor === "") {
        mostrarMensaje("Por favor, ingrese un valor.", "red");
        return;
      }

      DOM.mensaje.textContent = "";
      
      if (etapa === "palabras") {
        data.palabras.push(valor);
        
        if (data.palabras.length === 5) {
          etapa = "colores";
        }

      } else if (etapa === "colores") {
        if (!coloresValidos.includes(valor)) {
          mostrarMensaje(`Color no válido. Intente con: ${coloresValidos.join(", ")}`, "red");
          return;
        }
        
        data.colores.push(valor);
        
        if (data.colores.length === 5) {
          etapa = "numeros";
        }

      } else if (etapa === "numeros") {
        const numero = parseInt(valor);
        if (isNaN(numero)) {
          mostrarMensaje("Por favor, ingrese un número válido.", "red");
          return;
        }
        
        if (!data.numeros.includes(numero)) {
          data.numeros.push(numero);
        } else {
          mostrarMensaje(`El número ${numero} ya está en la lista.`, "orange");
        }
        
        if (data.numeros.length === 5) {
          etapa = "finalizado";
        }
      }

      actualizarUI();
      DOM.formulario.reset();
    });

    // Inicializar la UI
    actualizarUI();
