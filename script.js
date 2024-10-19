import {Estudiante, Empleado, Docente} from "./constructores.js"
const previousForms = JSON.parse(localStorage.getItem("forms"))
const submitBoton = document.getElementById("submit-btn")
const formularioPrincipal = document.getElementById("form-tag")
let clase

submitBoton.setAttribute('disabled', true)
if(!previousForms){
    localStorage.setItem("forms",JSON.stringify([]))
}

const tipoDeFormularios = {
    Estudiante, Empleado, Docente
}
const dataList = document.getElementById("list")

//relleno el datalist con los formularios existentes
for (const key in tipoDeFormularios) {
    const option = document.createElement("option")
    option.value = key
    option.textContent = key
    dataList.appendChild(option)
}

const formularioSeleccionado = document.getElementById("tipo-formulario")

function obtenerValor(evento){
    const key = formularioSeleccionado.value
    submitBoton.setAttribute('disabled', true)
    if(key.trim() === "") return
    clase = tipoDeFormularios[key]
    if(!clase) return
    submitBoton.removeAttribute('disabled')
    const inputs = new clase({}).crearInputs()
    const informacionAdicionalContenedor = document.getElementById("addicional-values")
    informacionAdicionalContenedor.innerHTML = '<legend>Información adicional</legend>'
    inputs.inputsCreados.forEach(input=>{
        informacionAdicionalContenedor.appendChild(input)
    })
}

formularioSeleccionado.addEventListener("input",obtenerValor)

function manejarFormulario(evento){
    const formulariosPrevios = document.getElementById("previous-forms-filed-list")
    evento.preventDefault()
    const informacion = new clase({})
    const valoresExtraidos = informacion.obtenerInfoDeForm(formularioPrincipal)
    console.log(valoresExtraidos)
    informacion.saveData(valoresExtraidos)
    informacion.updatePerson(valoresExtraidos)
    informacion.validarCampos()
    informacion.resetForm(formularioPrincipal)
    //insertar el registro en la lista
    const li = informacion.generarElemento(valoresExtraidos)
    formulariosPrevios.classList.add("animacion-aparecer")
    formulariosPrevios.appendChild(li)
}

// recolectar la informacion del formulario
formularioPrincipal.addEventListener("submit",manejarFormulario)