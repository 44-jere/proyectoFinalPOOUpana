import {
  formulariosHidratados,
  insertarCamposAdicionales,
  formularioPrincipal,
  submitBoton,
  formularioSeleccionado,
  manejarCreacionFormulario,
} from "./script.js";
import { colorPorDefecto, colorAlActualizar } from "./cambiarColores.js";
let formPrevio  

function actualizarObjeto(evento){
    evento.preventDefault()
    const valoresPasados = {}
    for (const key in formPrevio) {
        valoresPasados[key] = formPrevio[key]
    }
    const valoresExtraidos = formPrevio.obtenerInfoDeForm(formularioPrincipal);
    valoresExtraidos.identificador_único = formPrevio.identificador_único
    formPrevio.updatePerson(valoresExtraidos);
    try {
      formPrevio.validarCampos();
      formPrevio.resetForm(formularioPrincipal);
      formularioSeleccionado.value = ""
      formularioPrincipal.removeEventListener("submit",actualizarObjeto)
      formularioPrincipal.addEventListener("submit",manejarCreacionFormulario)
      colorPorDefecto()
      formularioSeleccionado.removeAttribute("disabled")
      submitBoton.value = "Submit"
      submitBoton.setAttribute("disabled",true);
      insertarCamposAdicionales({inputsCreados:[]})
    } catch (error) {
      formPrevio.updatePerson(valoresPasados);
    }
}

function prepararFormulario(id, form) {
  colorAlActualizar();
  formPrevio = formulariosHidratados.find(
    (e) => e.identificador_único === id
  );
  if (!formPrevio) {
    alert("el id del formulario no esta en el registro");
    colorPorDefecto();

    return;
  }
  formularioSeleccionado.value = formPrevio.tipo_formulario;
  formularioSeleccionado.setAttribute("disabled",true)
  submitBoton.value = "Guardar / Cancelar"
  submitBoton.removeAttribute("disabled");
  formPrevio.resetForm(form);
  const inputs = formPrevio.crearInputs();
  const h4 = document.createElement("h4")
  h4.textContent = "el formulario con id: " + formPrevio.identificador_único + " se está actualizando"
  inputs.inputsCreados.push(h4)
  insertarCamposAdicionales(inputs);
  formPrevio.actualizarInputs();
  formularioPrincipal.removeEventListener("submit",manejarCreacionFormulario)
  formularioPrincipal.addEventListener("submit",actualizarObjeto)
}

export function actulizaFormulario(id) {
  const inputs = Array.from(
    formularioPrincipal.querySelectorAll('input:not([type="submit"])')
  );
  const formTieneContenido = inputs.some((e) => e.value !== "");

  if (formTieneContenido) {
    const confirmacion = confirm(
      "¿Estás seguro de que quieres eliminar el contenido del formulario?"
    );
    if (!confirmacion) return;
  }

  prepararFormulario(id, formularioPrincipal);
}