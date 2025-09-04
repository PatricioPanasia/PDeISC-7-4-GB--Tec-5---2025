import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Notificacion from "./components/Notificacion";
import Button from "./components/Button";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const navigate = useNavigate();

  // ✅ Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3001/usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      showNotificacion("Error al cargar usuarios", "error");
    }
  };

  // ✅ Crear o actualizar usuario
  const agregarUsuario = async (usuario) => {
    try {
      if (editando) {
        await fetch(`http://localhost:3001/usuarios/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        });
        showNotificacion("Usuario actualizado correctamente", "success");
      } else {
        await fetch("http://localhost:3001/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        });
        showNotificacion("Usuario creado correctamente", "success");
      }
      await fetchUsuarios();
      setEditando(null);
      navigate("/usuarios");
    } catch (err) {
      console.error("Error guardando usuario:", err);
      showNotificacion("Error al guardar usuario", "error");
    }
  };

  // ✅ Editar usuario
  const editarUsuario = (usuario) => {
    setEditando(usuario);
    navigate("/");
  };

  // ✅ Eliminar usuario
  const eliminarUsuario = (usuario) => {
    setNotificacion({
      mensaje: `¿Seguro que deseas eliminar a ${usuario.nombre} ${usuario.apellido}?`,
      tipo: "confirmacion",
      onConfirm: async () => {
        try {
          await fetch(`http://localhost:3001/usuarios/${usuario.id}`, {
            method: "DELETE",
          });
          await fetchUsuarios();
          showNotificacion("Usuario eliminado correctamente", "success");
        } catch (err) {
          console.error("Error eliminando usuario:", err);
          showNotificacion("Error al eliminar usuario", "error");
        }
      },
      onCancel: () => setNotificacion(null),
    });
  };

  const showNotificacion = (mensaje, tipo) => {
    setNotificacion({
      mensaje,
      tipo,
      onConfirm: null,
      onCancel: () => setNotificacion(null)
    });
  };

  return (
    <div className="app-wrapper">
      <Routes>
        {/* Página del formulario */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <h1 className="app-title">Gestión de Usuarios</h1>
              <UserForm 
                onSubmit={agregarUsuario} 
                initialData={editando}
                onCancelEdit={() => {
                  setEditando(null);
                  showNotificacion("Edición cancelada", "info");
                }}
                isEditing={!!editando}
              />

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link to="/usuarios">
                  <Button color="yellow">Ver usuarios registrados</Button>
                </Link>
              </div>
            </div>
          }
        />

        {/* Página de usuarios */}
        <Route
          path="/usuarios"
          element={
            <div className="app-container">
              <h1 className="app-title">Usuarios registrados</h1>
              <UserList
                usuarios={usuarios}
                onEdit={editarUsuario}
                onDelete={eliminarUsuario}
              />
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link to="/">
                  <Button color="blue">Volver al formulario</Button>
                </Link>
              </div>
            </div>
          }
        />
      </Routes>

      <Notificacion
        mensaje={notificacion?.mensaje}
        tipo={notificacion?.tipo}
        onConfirm={notificacion?.onConfirm}
        onCancel={notificacion?.onCancel}
      />
    </div>
  );
}