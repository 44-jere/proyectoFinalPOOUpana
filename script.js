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
    console.log(formulariosHidratados)
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


//logica filtrar
const inputFiltrar = document.getElementById("filtro")
const contenedorLI = document.getElementById("previous-forms-filed-list")

function logicaFiltrar(){
    const DPI = inputFiltrar.value
    contenedorLI.classList.add("hide")
    document.querySelectorAll(".exception").forEach(e=>e.classList.remove("exception"))
    if(DPI === ""){
        contenedorLI.classList.remove("hide")
        return
    }
    const existe = formulariosHidratados.find(formulario=>formulario.DPI === DPI)
    if(!existe) return
    document.getElementById(existe.identificador_único).classList.add("exception")
}

inputFiltrar.addEventListener("input",logicaFiltrar)