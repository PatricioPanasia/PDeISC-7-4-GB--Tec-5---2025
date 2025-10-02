// Importamos elementos de React Router para navegación entre páginas
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Importamos las 3 páginas principales
import Tareas from "./pages/Tareas";
import Infotareas from "./pages/Infotareas";
import Formulariotareas from "./pages/Formulariotareas";

// Importamos los estilos generales
import "./App.css";

function App() {
  return (
    // Router envuelve toda la app y permite usar rutas
    <Router>
      {/* Barra de navegación que se verá en todas las páginas */}
      <nav>
        <h1 className="logo">Mis Tareas</h1>
        <div className="links">
          {/* Link es como un <a>, pero no recarga la página */}
          <Link to="/">Inicio</Link>
          <Link to="/form">Nueva Tarea</Link>
        </div>
      </nav>

      {/* Aquí se renderiza el contenido de cada ruta */}
      <div className="main-content">
        <Routes>
          {/* Ruta "/" → muestra la lista de tareas */}
          <Route path="/" element={<Tareas />} />
          {/* Ruta con parámetro ":id" → detalle de una tarea */}
          <Route path="/task/:id" element={<Infotareas />} />
          {/* Ruta "/form" → formulario para crear nueva tarea */}
          <Route path="/form" element={<Formulariotareas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
