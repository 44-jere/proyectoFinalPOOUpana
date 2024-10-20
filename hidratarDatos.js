import { formulariosHidratados,formulariosPreviosEnHTML,tipoDeFormularios } from "./script.js";
const informe = {
    camposFaltantes:0,
    noTieneID:0

}

const mostrarInforme = false

export function hidratarDesdeJSON(json,guardarEnMemoria = false){
    const datos = JSON.parse(json)
    datos.forEach(valores => {
        if(!valores.identificador_único){//no tiene id
            informe.noTieneID++
            mostrarInforme = true
            return
        }

        const yaIngresado = formulariosHidratados.find(formulario => formulario.identificador_único === valores.identificador_único)
        if(yaIngresado) return
        const newFormulario = new tipoDeFormularios[valores.tipo_formulario](valores)
        try {
            newFormulario.validarCampos()
            formulariosHidratados.push(newFormulario)
            const li = newFormulario.generarElemento(valores)
            formulariosPreviosEnHTML.appendChild(li)
            if(guardarEnMemoria){
                newFormulario.saveData(valores)
            }
        } catch (error) {
            informe.camposFaltantes++
            mostrarInforme = true
        }
    });

    if(mostrarInforme){
        const mensaje = 
        `
        algunos formularios no fueron ingresados, 
        ${informe.camposFaltantes} formularios no tenian los campos obligatorios,
        ${informe.noTieneID} forularios no tenian id
        `
        alert(mensaje)
    }
}