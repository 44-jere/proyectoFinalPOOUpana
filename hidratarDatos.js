import { formulariosHidratados,formulariosPreviosEnHTML,tipoDeFormularios } from "./script.js";

export function hidratarDesdeJSON(json){
    const datos = JSON.parse(json)
    datos.forEach(valores => {
        const yaIngresado = formulariosHidratados.find(formulario => formulario.identificador_único === valores.identificador_único)
        if(yaIngresado) return
        const newFormulario = new tipoDeFormularios[valores.tipo_formulario](valores)
        formulariosHidratados.push(newFormulario)
        const li = newFormulario.generarElemento(valores)
        formulariosPreviosEnHTML.appendChild(li)
    });
}