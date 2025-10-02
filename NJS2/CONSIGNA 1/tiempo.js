function obtenerHoraActual() {
    const ahora = new Date();
    return ahora.toLocaleTimeString();
  }
  
  module.exports = { obtenerHoraActual }