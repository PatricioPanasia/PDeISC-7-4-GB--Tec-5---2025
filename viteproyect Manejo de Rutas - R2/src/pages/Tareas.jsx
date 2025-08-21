import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";

function Tareas() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(stored);
  }, []);

  const toggleCompletada = (id) => {
    const updated = tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    setTareas(updated);
    localStorage.setItem("tareas", JSON.stringify(updated));
  };

  const eliminarTarea = (id) => {
    const updated = tareas.filter((t) => t.id !== id);
    setTareas(updated);
    localStorage.setItem("tareas", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2 className="title">Lista de Tareas</h2>

      {tareas.length === 0 ? (
        <p>No hay tareas creadas todavía.</p>
      ) : (
        tareas.map((t) => (
          <div key={t.id} className={`task-card ${t.completada ? "done" : ""}`}>
            <h3>{t.titulo}</h3>
            <p>{t.descripcion}</p>
            <p className="fecha">Entrega: {t.fechaEntrega}</p>
            <div className="task-actions">
              <Button
                text={t.completada ? "Marcar incompleta" : "Marcar completada"}
                onClick={() => toggleCompletada(t.id)}
                type="success"
              />

              <Link to={`/task/${t.id}`}>
                <Button text="Ver detalle" type="info" />
              </Link>

              {/* Nuevo botón editar */}
              <Button
                text="Editar"
                type="warning"
                onClick={() => navigate(`/form?id=${t.id}`)}
              />

              {/* Eliminar solo si está completada */}
              {t.completada && (
                <Button
                  text="Eliminar"
                  onClick={() => eliminarTarea(t.id)}
                  type="danger"
                />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tareas;
