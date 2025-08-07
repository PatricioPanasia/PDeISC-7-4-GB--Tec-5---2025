import { useState } from "react";
import './Componente2.css';
import imagenPerfil from './descargar.jpg';

function Componente2() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [profesion, setProfesion] = useState("");
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() && apellido.trim() && profesion.trim()) {
      setMostrarTarjeta(true);
    }
  };

  return (
    <div>
      {/* Formulario */}
      <form
        onSubmit={manejarEnvio}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          margin: "20px auto",
          background: "#1e1e1e",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          color: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Ingresar datos</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profesión"
          value={profesion}
          onChange={(e) => setProfesion(e.target.value)}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4fc3f7",
            color: "#1e1e1e",
            border: "none",
            padding: "8px 15px",
            fontSize: "1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Guardar
        </button>
      </form>

      {/* Tarjeta solo si hay datos */}
      {mostrarTarjeta && (
        <div className="tarjeta">
          <img
            src={imagenPerfil}
            alt={`${nombre} ${apellido}`}
            className="tarjeta-img"
          />
          <h2>{nombre} {apellido}</h2>
          <p>{profesion}</p>
        </div>
      )}
    </div>
  );
}

export default Componente2;
