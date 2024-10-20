import {formulariosHidratados} from "./script.js"
const enlaceDescarga = document.getElementById("descargar-formularios")
function añadirLink(event){
    if(formulariosHidratados.length === 0){
        alert("no hay formularios para descargar")
        return
    } 
    const datosJSON = JSON.stringify(formulariosHidratados,null,2)
    const blob = new Blob([datosJSON],{type:"application/json"})
    const url = URL.createObjectURL(blob)
    enlaceDescarga.href = url
    enlaceDescarga.download = "historialDeFormularios.json"
}
enlaceDescarga.addEventListener("click",añadirLink)