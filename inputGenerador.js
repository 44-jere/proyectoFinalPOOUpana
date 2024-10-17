export function generarInput({ key, labelText, inputType, autoComplete } = {}) {
  // Crear el contenedor principal
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  // Crear la etiqueta <label> y establecer sus atributos
  const label = document.createElement("label");
  label.setAttribute("for", key);
  label.textContent = labelText;

  // Crear el campo de entrada <input> y establecer sus atributos
  const input = document.createElement("input");
  input.setAttribute("name", key);
  input.setAttribute("id", key);

  if (!!inputType) {
    // Asignar el tipo de input dinámicamente
    input.setAttribute("type", inputType);
  }

  if (!!autoComplete) {
    // Asignar el tipo de autocomplete dinámicamente
    input.setAttribute("autocomplete", autoComplete);
  }

  // Añadir los elementos al contenedor
  inputContainer.appendChild(label);
  inputContainer.appendChild(input);

  // Añadir el contenedor al DOM (o devolverlo para que se añada en otro lugar)
  return inputContainer;
}
