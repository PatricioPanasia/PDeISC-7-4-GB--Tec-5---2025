import React, { useState } from "react";
import "./Componente5.css";

function Componente5() {
  const [nombre, setNombre] = useState("");
  const [bienvenida, setBienvenida] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      setBienvenida("Por favor, ingresa tu nombre.");
      return;
    }
    setBienvenida(`¡Bienvenido/a, ${nombre}!`);
    setNombre("");
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Bienvenida</h2>
      <form onSubmit={manejarEnvio} className="formulario">
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {bienvenida && <p className="mensaje">{bienvenida}</p>}
    </div>
  );
}

export default Componente5;
