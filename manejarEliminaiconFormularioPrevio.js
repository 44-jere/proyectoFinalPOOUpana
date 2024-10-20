import { formulariosHidratados } from "./script.js";
export function eliminarFormulario(id) {
  const indice = formulariosHidratados.findIndex((obj) => obj.identificador_único === id);
    console.log(indice)
  if (indice !== -1) {
    formulariosHidratados[indice].deletePerson(id);
    formulariosHidratados.splice(indice, 1);
  }
}
