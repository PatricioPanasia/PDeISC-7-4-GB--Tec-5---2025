import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { suma, resta, multiplicacion, division } from "./calculos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta para enviar los cálculos en formato JSON
app.get("/calculos", (req, res) => {
    const resultados = [
        { operacion: "Suma", resultado: suma(4, 5) },
        { operacion: "Resta", resultado: resta(3, 6) },
        { operacion: "Multiplicación", resultado: multiplicacion(2, 7) },
        { operacion: "División", resultado: division(20, 4) }
    ];
    res.json(resultados);
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});
