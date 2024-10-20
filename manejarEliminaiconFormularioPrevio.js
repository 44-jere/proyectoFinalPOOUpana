import { formulariosHidratados } from "./script.js";
export function eliminarFormulario(id) {
  // Encontrar el índice del objeto con id 2
  const indice = formulariosHidratados.findIndex((obj) => obj.identificador_único === id);
    console.log(indice)
  if (indice !== -1) {
    formulariosHidratados[indice].deletePerson(id);
    formulariosHidratados.splice(indice, 1); // Elimina 1 elemento en el índice encontrado
  }
}
