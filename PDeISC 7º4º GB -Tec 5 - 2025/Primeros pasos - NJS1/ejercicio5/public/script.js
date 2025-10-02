document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Obtener los datos de la API
        const response = await fetch("/calculos");
        const data = await response.json();

        // Insertar datos en la tabla
        const tablaResultados = document.getElementById("tablaResultados");
        data.forEach(item => {
            const row = `<tr>
                            <td>${item.operacion}</td>
                            <td>${item.resultado}</td>
                        </tr>`;
            tablaResultados.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al obtener los cálculos:", error);
    }
});
