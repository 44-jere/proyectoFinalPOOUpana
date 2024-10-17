export function buscarYactualizarInputs({ contenedor, selector, data } = {}) {
  const contenedorPrincipal = document.querySelector(contenedor);
  const inputs = contenedorPrincipal.querySelectorAll(selector);
  inputs.forEach((input) => {
    const id = input.id;
    const value = data[id];
    if (!value) return;
    input.value = value;
  });
}
