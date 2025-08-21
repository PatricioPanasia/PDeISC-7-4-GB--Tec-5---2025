import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";

function Infotareas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tareas")) || [];
    const found = stored.find((t) => t.id === parseInt(id));
    setTarea(found);
  }, [id]);

  if (!tarea) {
    return (
      <div className="container">
        <p>No se encontró la tarea.</p>
        <div className="button-right">
          <Button text="Volver" type="info" onClick={() => navigate("/")} />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="title">Detalle de la Tarea</h2>
      <div className={`task-card ${tarea.completada ? "done" : ""}`}>
        <h3>{tarea.titulo}</h3>
        <p>{tarea.descripcion}</p>
        <p>Fecha de creación: {tarea.fechaCreacion}</p>
        <p>
          Entrega:{" "}
          {tarea.fechaEntrega && tarea.fechaEntrega.trim() !== ""
            ? tarea.fechaEntrega
            : "Sin fecha de entrega"}
        </p>
        <p>
          Estado: <strong>{tarea.completada ? "Completada" : "Pendiente"}</strong>
        </p>
      </div>

      <div className="button-right">
        <Button text="Editar" type="warning" onClick={() => navigate(`/form?id=${tarea.id}`)} />
        <Button text="Volver" type="info" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default Infotareas;
