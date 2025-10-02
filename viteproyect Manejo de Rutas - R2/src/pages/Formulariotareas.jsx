import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";

function Formulariotareas() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [sinFecha, setSinFecha] = useState(false);
  const [completada, setCompletada] = useState(false);
  const [error, setError] = useState(""); // 🔹 Mensaje de error

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // si existe, estamos editando

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      const stored = JSON.parse(localStorage.getItem("tareas")) || [];
      const tarea = stored.find((t) => t.id === parseInt(id));
      if (tarea) {
        setTitulo(tarea.titulo);
        setDescripcion(tarea.descripcion);
        setFechaEntrega(tarea.fechaEntrega === "Sin fecha de entrega" ? "" : tarea.fechaEntrega);
        setSinFecha(tarea.fechaEntrega === "Sin fecha de entrega");
        setCompletada(tarea.completada);
      }
    }
  }, [id]);

  const validarTitulo = (titulo) => {
    const limpio = titulo.trim();

    if (limpio.length < 3) return false; // muy corto
    if (/^\d+$/.test(limpio)) return false; // solo números
    if (/^([a-zA-Z])\1+$/.test(limpio)) return false; // repetición de la misma letra (ej: "aaa")
    if (!/[a-zA-Z]/.test(limpio)) return false; // no tiene letras

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarTitulo(titulo)) {
      setError("⚠️ Ingresa un nombre válido para la tarea.");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("tareas")) || [];

    if (id) {
      // 🔥 Editar tarea existente
      const updated = stored.map((t) =>
        t.id === parseInt(id)
          ? {
              ...t,
              titulo,
              descripcion,
              fechaEntrega: sinFecha ? "Sin fecha de entrega" : fechaEntrega,
              completada,
            }
          : t
      );
      localStorage.setItem("tareas", JSON.stringify(updated));
    } else {
      // Crear nueva tarea
      const nuevaTarea = {
        id: Date.now(),
        titulo,
        descripcion,
        fechaCreacion: new Date().toLocaleDateString(),
        fechaEntrega: sinFecha ? "Sin fecha de entrega" : fechaEntrega,
        completada,
      };
      stored.push(nuevaTarea);
      localStorage.setItem("tareas", JSON.stringify(stored));
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="title">{id ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            setError(""); // 🔹 limpiar error al escribir
          }}
          required
        />
        {error && <p className="error-message">{error}</p>}

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>
          Fecha de entrega:
          <input
            type="date"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            disabled={sinFecha}
            required={!sinFecha}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={sinFecha}
            onChange={(e) => {
              const checked = e.target.checked;
              setSinFecha(checked);
              if (checked) setFechaEntrega("");
            }}
          />
          Sin fecha de entrega
        </label>

        <Button text={id ? "Guardar cambios" : "Guardar tarea"} type="success" htmlType="submit" full />
      </form>

      <div className="button-right">
        <Button text="Volver" type="info" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default Formulariotareas;
