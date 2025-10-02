const data = {
  frutas: [],
  amigos: [],
  numeros: []
};

const config = {
  frutasValidas: ["manzana", "banana", "pera", "naranja", "kiwi", "sandia", "melon", "frutilla", "durazno", "uva", "mango", "cereza"],
  etapas: {
    frutas: { next: "amigos", limit: 3, label: "fruta", button: "Guardar fruta" },
    amigos: { next: "numeros", limit: 3, label: "amigo", button: "Guardar amigo" },
    numeros: { next: null, label: "número", button: "Guardar número" }
  }
};

const DOM = {
  formulario: document.getElementById("formulario"),
  entrada: document.getElementById("entrada"),
  lista: document.getElementById("lista"),
  mensaje: document.getElementById("mensaje"),
  etiqueta: document.getElementById("etiquetaInput"),
  boton: document.getElementById("boton")
};

let etapaActual = "frutas";

// Funciones reutilizables
const helpers = {
  normalizar: texto => texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
  crearItem: texto => {
    const item = document.createElement("li");
    item.textContent = texto;
    return item;
  },
  deshabilitarFormulario: () => {
    DOM.entrada.disabled = true;
    DOM.boton.disabled = true;
    DOM.boton.textContent = "Formulario completado";
    DOM.mensaje.textContent = "Formulario completado. No se pueden ingresar más números.";
    DOM.mensaje.style.color = "red";
  },
  validarSoloLetras: valor => /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(valor),
  actualizarUI: (etapa) => {
    DOM.etiqueta.textContent = `Ingrese un ${config.etapas[etapa].label} (de a uno por vez):`;
    DOM.boton.textContent = config.etapas[etapa].button;
    DOM.entrada.type = etapa === "numeros" ? "number" : "text";
  }
};

// Lógica para cada etapa
const etapas = {
  frutas: (valor) => {
    const normalizado = helpers.normalizar(valor);
    if (!helpers.validarSoloLetras(valor)) return "Solo letras y espacios.";
    if (!config.frutasValidas.includes(normalizado)) return "Fruta no registrada. Ingresá una fruta válida.";
    
    data.frutas.push(valor);
    return {msg: "¡Fruta guardada!", color: "green", item: `Fruta: ${valor}`};
  },
  
  amigos: (valor) => {
    if (!helpers.validarSoloLetras(valor)) return "Solo letras y espacios.";
    
    data.amigos.push(valor);
    return {msg: "¡Amigo guardado!", color: "green", item: `Amigo: ${valor}`};
  },
  
  numeros: (valor) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return "Por favor, ingresá un número válido.";
    
    // Validación para todos los números (desde el primero)
    if (data.numeros.length > 0) {
      const ultimoNumero = data.numeros[data.numeros.length - 1];
      
      if (numero <= ultimoNumero) {
        helpers.deshabilitarFormulario();
        return {msg: `El número debe ser mayor que ${ultimoNumero}. Formulario completado.`, color: "red"};
      }
    }
    
    data.numeros.push(numero);
    const mensaje = data.numeros.length === 1 
      ? "¡Número guardado! Ingrese un número mayor que este." 
      : `¡Número guardado! Ahora ingrese un número mayor que ${numero}.`;
    
    return {msg: mensaje, color: "green", item: `Número ${data.numeros.length}: ${numero}`};
  }
};

// Manejador del formulario
DOM.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = DOM.entrada.value.trim();
  const etapaConfig = config.etapas[etapaActual];
  
  // Validar y procesar dato
  const resultado = etapas[etapaActual](valor);
  
  if (typeof resultado === "string") {
    DOM.mensaje.textContent = resultado;
    DOM.mensaje.style.color = "red";
    DOM.formulario.reset();
    return;
  }
  
  // Mostrar resultado
  DOM.mensaje.textContent = resultado.msg;
  DOM.mensaje.style.color = resultado.color;
  
  // Agregar a la lista solo si hay item
  if (resultado.item) {
    DOM.lista.appendChild(helpers.crearItem(resultado.item));
  }
  
  // Cambiar de etapa si se alcanzó el límite
  if (etapaConfig.limit && data[etapaActual].length >= etapaConfig.limit) {
    etapaActual = etapaConfig.next;
    if (etapaActual) helpers.actualizarUI(etapaActual);
  }
  
  DOM.formulario.reset();
});

// Inicializar UI
helpers.actualizarUI(etapaActual);