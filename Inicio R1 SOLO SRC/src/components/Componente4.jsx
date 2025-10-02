import React, { useState } from "react";
import "./Componente4.css";

function Componente4() {
  const [tareas, setTareas] = useState([]);
  const [completadas, setCompletadas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;
    setTareas([...tareas, nuevaTarea]);
    setNuevaTarea("");
  };

  const completarTarea = (index) => {
    const tareaCompletada = tareas[index];
    setCompletadas([...completadas, tareaCompletada]);
    setTareas(tareas.filter((_, i) => i !== index));
  };

  return (
    <div className="tareas-container">
      <h2>Lista de tareas</h2>
      <div className="tareas-input">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <h3>Pendientes</h3>
      {tareas.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        <ul className="lista-tareas">
          {tareas.map((tarea, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => completarTarea(index)}
                />{" "}
                {tarea}
              </label>
            </li>
          ))}
        </ul>
      )}

      <h3>Completadas</h3>
      {completadas.length === 0 ? (
        <p>No hay tareas completadas</p>
      ) : (
        <ul className="lista-tareas">
          {completadas.map((tarea, index) => (
            <li key={index} className="tarea-completada">
              {tarea}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Componente4;
