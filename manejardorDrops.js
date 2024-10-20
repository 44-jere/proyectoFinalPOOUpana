import { hidratarDesdeJSON } from "./hidratarDatos.js";
// Seleccionamos los elementos
const dropArea = document.getElementById("area-dropeo");
const fileInput = document.getElementById("archivo");

// Función para manejar los archivos
function manejarArchivos(archivos) {
  const archivosAceptados = [...archivos].filter(
    (archivo) => archivo.type === "application/json"
  );

  if (archivosAceptados.length > 0) {
    archivosAceptados.forEach((archivo) => {
      const lector = new FileReader();
      lector.onload = (e) => {
        const contenido = e.target.result;
        const guardarEnMemoria = true;
        hidratarDesdeJSON(contenido, guardarEnMemoria);
        alert("ingresados correctamente")
      };
      lector.readAsText(archivo); // Leer el archivo como texto
    });
  } else {
    alert("Solo se aceptan archivos JSON.");
  }
}

// Prevenir el comportamiento por defecto en dragover y drop
["dragenter", "dragover", "dragleave", "drop"].forEach((evento) => {
  dropArea.addEventListener(evento, (e) => e.preventDefault());
  dropArea.addEventListener(evento, (e) => e.stopPropagation());
});

// Visualmente indicar que el área está activa al arrastrar sobre ella
["dragenter", "dragover"].forEach((evento) => {
  dropArea.addEventListener(evento, () => {
    dropArea.classList.add("drag-over");
  });
});

// Cuando el archivo deja de estar sobre el área, quitar el estilo
["dragleave", "drop"].forEach((evento) => {
  dropArea.addEventListener(evento, () => {
    dropArea.classList.remove("drag-over");
  });
});

// Manejamos el evento drop para archivos
dropArea.addEventListener("drop", (e) => {
  const archivos = e.dataTransfer.files;
  manejarArchivos(archivos);
});

// Manejamos la selección de archivos desde el input
fileInput.addEventListener("change", (e) => {
  const archivos = e.target.files;
  manejarArchivos(archivos);
});
