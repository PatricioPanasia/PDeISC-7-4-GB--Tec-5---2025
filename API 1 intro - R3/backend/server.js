import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usr");
  res.json(rows);
});

// ✅ Crear usuario
app.post("/usuarios", async (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, celular_pais } = req.body;
  await pool.query(
    "INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, celular_pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, celular_pais]
  );
  res.json({ message: "Usuario creado correctamente" });
});

// ✅ Editar usuario
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, celular_pais } = req.body;
  await pool.query(
    "UPDATE usr SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=?, celular_pais=? WHERE id=?",
    [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, celular_pais, id]
  );
  res.json({ message: "Usuario actualizado correctamente" });
});

// ✅ Eliminar usuario
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM usr WHERE id=?", [id]);
  res.json({ message: "Usuario eliminado correctamente" });
});

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});
