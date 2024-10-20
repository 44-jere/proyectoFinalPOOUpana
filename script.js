import {Estudiante, Empleado, Docente} from "./constructores.js"
import {hidratarDesdeJSON} from "./hidratarDatos.js"
export const formulariosHidratados = []
export const formulariosPreviosEnHTML = document.getElementById("previous-forms-filed-list")
const previousForms = localStorage.getItem("forms")
export const submitBoton = document.getElementById("submit-btn")
export const formularioPrincipal = document.getElementById("form-tag")
let clase

submitBoton.setAttribute('disabled', true)


export const tipoDeFormularios = {
    Estudiante, Empleado, Docente
}

if(!previousForms){
    localStorage.setItem("forms",JSON.stringify([]))
}else{
    hidratarDesdeJSON(previousForms)
}
const dataList = document.getElementById("list")

//relleno el datalist con los formularios existentes
for (const key in tipoDeFormularios) {
    const option = document.createElement("option")
    option.value = key
    option.textContent = key
    dataList.appendChild(option)
}

export const formularioSeleccionado = document.getElementById("tipo-formulario")

export function insertarCamposAdicionales(inputs){
    const informacionAdicionalContenedor = document.getElementById("addicional-values")
    informacionAdicionalContenedor.innerHTML = '<legend>Información adicional</legend>'
    inputs.inputsCreados.forEach(input=>{
        informacionAdicionalContenedor.appendChild(input)
    })
}

function obtenerValor(evento){
    const key = formularioSeleccionado.value
    submitBoton.setAttribute('disabled', true)
    if(key.trim() === "") return
    clase = tipoDeFormularios[key]
    if(!clase) return
    submitBoton.removeAttribute('disabled')
    const inputs = new clase({}).crearInputs()

    insertarCamposAdicionales(inputs)
}

formularioSeleccionado.addEventListener("input",obtenerValor)

export function manejarCreacionFormulario(evento){
    evento.preventDefault()
    const informacion = new clase({})
    const valoresExtraidos = informacion.obtenerInfoDeForm(formularioPrincipal)
    informacion.saveData(valoresExtraidos)
    informacion.updatePerson(valoresExtraidos)
    try {
        informacion.validarCampos()
        informacion.resetForm(formularioPrincipal)
        //insertar el registro en la lista
        const li = informacion.generarElemento(informacion)
        formulariosPreviosEnHTML.appendChild(li)
        //insertar el formulario en el array
        formulariosHidratados.push(informacion)
    } catch (error) {
        informacion.deletePerson(informacion.identificador_único)
    }

}

// recolectar la informacion del formulario
formularioPrincipal.addEventListener("submit",manejarCreacionFormulario)