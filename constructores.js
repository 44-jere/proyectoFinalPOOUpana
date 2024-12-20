import {generarLi} from "./LIgenerador.js"
import {buscarYactualizarInputs} from "./acualizadorInputs.js"
import {generarInput} from "./inputGenerador.js"
import {generarSeccionCursos,generarElementoCurso} from "./registrarCursos.js"
import { formulariosHidratados } from "./script.js";
function campoNoDado(message){
    alert(message)
    throw new Error(message);
}

function extraerInfoDeInputs(form){
    const data = {}
    const formData = new FormData(form)
    formData.forEach((value, key) => {
        data[key] = value;
    });
    data.identificador_único = globalThis.crypto.randomUUID()
    return data
}

function extraerCursos(form){
    const clases = form.querySelectorAll("[data-curso]")
    const valores = []
    clases.forEach(clase => valores.push(clase.getAttribute('data-curso')));
    return valores
}

//1. implementar herencia creando clase abstracta almacenar características de una persona
export class Persona{
    constructor(
        {
            tipo_formulario = "",
            primer_nombre = "",
            segundo_nombre = "",
            tercer_nombre = "",
            primer_apellido = "",
            segundo_apellido = "",
            apellido_de_casada = "",
            identificador_único = "",
            fecha_de_nacimiento = "",
            país_de_nacimiento = "",
            departamento_o_provincia_de_nacimiento = "",
            municipio_o_ciudad_de_nacimiento = "",
            correo_electrónico = "",
            teléfono_celular = "",
            teléfono_residencial = "",
            DPI = ""
        }
    ){
        this.tipo_formulario = tipo_formulario,
        this.primer_nombre = primer_nombre,
        this.segundo_nombre = segundo_nombre,
        this.tercer_nombre = tercer_nombre,
        this.primer_apellido = primer_apellido,
        this.segundo_apellido = segundo_apellido,
        this.apellido_de_casada = apellido_de_casada,
        this.identificador_único = identificador_único,
        this.fecha_de_nacimiento = fecha_de_nacimiento,
        this.país_de_nacimiento = país_de_nacimiento,
        this.departamento_o_provincia_de_nacimiento = departamento_o_provincia_de_nacimiento,
        this.municipio_o_ciudad_de_nacimiento = municipio_o_ciudad_de_nacimiento,
        this.correo_electrónico = correo_electrónico,
        this.teléfono_celular = teléfono_celular,
        this.teléfono_residencial = teléfono_residencial,
        this.DPI = DPI
    }
    validarCampos(){
        if(this.primer_nombre === "") campoNoDado("campo primer nombre no dado")
        if(this.primer_apellido === "") campoNoDado("campo primer apellido no dado")
        if(this.identificador_único === "") campoNoDado("campo identificador único no dado")
        if(this.fecha_de_nacimiento === "") campoNoDado("campo fecha de nacimiento no dado")
        if(this.país_de_nacimiento === "") campoNoDado("campo país de nacimiento no dado")
        if(this.departamento_o_provincia_de_nacimiento === "") campoNoDado("departamento o provincia de nacimiento")
        if(this.municipio_o_ciudad_de_nacimiento === "") campoNoDado("municipio o ciudad de nacimiento")
        if(this.DPI === "") campoNoDado("DPI no dado")
        if(formulariosHidratados.some(e=>e.DPI === this.DPI)) campoNoDado("DPI ya ingresado")
    }
    deletePerson(id){
        const listPersons = JSON.parse(localStorage.getItem("forms"))
        const index = listPersons.findIndex(person=>person.identificador_único === id)
        if (index !== -1) {
            listPersons.splice(index, 1)
            localStorage.setItem("forms",JSON.stringify(listPersons))
            return {
                exito:true,
                mensaje:"encontrado y eliminado"
            } //encontrado y eliminado
        }   
        return {
            exito:false,
            mensaje:"no encontrado"
        } // no encontrado
    }
    saveData(datosPorActualizar){
        const listPersons = JSON.parse(localStorage.getItem("forms"))
        const valores = Object.entries(this)

        const data = {};     
        valores.forEach(([key, value]) => {
            data[key] = value;
        });

        for(let key in datosPorActualizar){
            data[key] = datosPorActualizar[key]
        }
        
        listPersons.push(data)
        localStorage.setItem("forms",JSON.stringify(listPersons))

        return {
            exito:true,
            message:"agregado exitosamente"
        }
    }
    updatePerson(data){
        const listPersons = JSON.parse(localStorage.getItem("forms"))
        if(listPersons.length === 0){
            return {
                exito:false,
                message:"no hay registros"
            }
        }
        const person = listPersons.find(person => person.identificador_único === data.identificador_único)
        if(!person){
            return {
                exito:false,
                message:"esta persona no fue encontrada"
            }
        }
        Object.entries(data).forEach(([key,value]) =>{
            person[key] = value
            this[key] = value // actualizo el valor en el mismo objeto
        })
        localStorage.setItem("forms",JSON.stringify(listPersons))
        return {
            exito:true,
            message:"actualizado con exito",
        }
    }
    pushRegister(datosPorActualizar){
        this.saveData(datosPorActualizar)
        return {
            exito:true,
            message:"guardado y generado exitosamente",
        }
    }
    actualizarInputs(){
        const instrucciones = {
            contenedor:"form-tag",
            selector:'input:not([type="submit"])',
            data:this
        }

        buscarYactualizarInputs(instrucciones)
        
        return {
            exito:true,
            mensaje:"los inputs fueron actualizados correctamente"
        }
    }
    obtenerInfoDeForm(form){
        return extraerInfoDeInputs(form)
    }
    resetForm(form){
        form.reset()
    }
    generarElemento(data){
        const li = generarLi(data)
        return li
    }
}

// 2. CLASES ESPECÍFICAS: Se necesita almacenar datos de entidades que hereden las propiedades de persona 

export class Estudiante extends Persona{
    constructor(      
        {
            tipo_formulario = "Estudiante",
            primer_nombre = "",
            segundo_nombre = "",
            tercer_nombre = "",
            primer_apellido = "",
            segundo_apellido = "",
            apellido_de_casada = "",
            identificador_único = "",
            fecha_de_nacimiento = "",
            país_de_nacimiento = "",
            departamento_o_provincia_de_nacimiento = "",
            municipio_o_ciudad_de_nacimiento = "",
            correo_electrónico = "",
            teléfono_celular = "",
            teléfono_residencial = "",
            correo_institucional="",
            número_de_carnet = "",
            DPI = ""         
        }
    ){
        super(
            {
                tipo_formulario,
                primer_nombre,
                segundo_nombre,
                tercer_nombre,
                primer_apellido,
                segundo_apellido,
                apellido_de_casada,
                identificador_único,
                fecha_de_nacimiento,
                país_de_nacimiento,
                departamento_o_provincia_de_nacimiento,
                municipio_o_ciudad_de_nacimiento,
                correo_electrónico,
                teléfono_celular,
                número_de_carnet,
                teléfono_residencial,
                DPI
            }
        )
        this.correo_institucional = correo_institucional,
        this.número_de_carnet = número_de_carnet
    }
    esMayor(){
        const [year, month, day] = this.fecha_de_nacimiento.split('-').map(Number)
        const fechaNacimiento = new Date(year, month - 1, day)
        
        const hoy = new Date()
        
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        
        const mesActual = hoy.getMonth() + 1
        const diaActual = hoy.getDate()
        
        if (mesActual < month || (mesActual === month && diaActual < day)) {
            edad--
        }
        
        return edad >= 18
    }
    crearInputs(){
        const inputsType = []

        //se crea un input por cada campo extra de esta clase
        inputsType.push({ 
            key:"correo_institucional",
            labelText:"correo institucional",
            inputType:"email",
            autoComplete:"email"
        })
        inputsType.push({ 
            key:"número_de_carnet",
            labelText:"número de carnet",
            inputType:"number"
        })

        const inputsCreados = inputsType.map(input => generarInput(input))
        return {inputsCreados}
    }
    updatePerson(data){
        const listPersons = JSON.parse(localStorage.getItem("forms"))
        if(listPersons.length === 0){
            return {
                exito:false,
                message:"no hay registros"
            }
        }
        const person = listPersons.find(person => person.identificador_único === data.identificador_único)
        if(!person){
            return {
                exito:false,
                message:"esta persona no fue encontrada"
            }
        }
        Object.entries(data).forEach(([key,value]) =>{
            person[key] = value
            this[key] = value // actualizo el valor en el mismo objeto
        })

        const esMayor = this.esMayor()? "Si":"No"
        const esMayorSpan = document.querySelector(`[data-esmayor='${this.identificador_único}']`)
        if(!!esMayorSpan){
            esMayorSpan.textContent = esMayor;
        }


        localStorage.setItem("forms",JSON.stringify(listPersons))
        return {
            exito:true,
            message:"actualizado con exito",
        }
    }
}
export class Empleado extends Persona{
    constructor(      
        {
            tipo_formulario = "Empleado",
            primer_nombre = "",
            segundo_nombre = "",
            tercer_nombre = "",
            primer_apellido = "",
            segundo_apellido = "",
            apellido_de_casada = "",
            identificador_único = "",
            fecha_de_nacimiento = "",
            país_de_nacimiento = "",
            departamento_o_provincia_de_nacimiento = "",
            municipio_o_ciudad_de_nacimiento = "",
            correo_electrónico = "",
            teléfono_celular = "",
            teléfono_residencial = "",
            código_de_empleado = "",
            correo_institucional = "",
            puesto = "",
            profesión = "",
            salario_mensual = "",
            DPI = "" 
        }
    ){
        super(
            {
                tipo_formulario,
                primer_nombre,
                segundo_nombre,
                tercer_nombre,
                primer_apellido,
                segundo_apellido,
                apellido_de_casada,
                identificador_único,
                fecha_de_nacimiento,
                país_de_nacimiento,
                departamento_o_provincia_de_nacimiento,
                municipio_o_ciudad_de_nacimiento,
                correo_electrónico,
                teléfono_celular,
                teléfono_residencial,
                DPI
            }
        )
        this.código_de_empleado = código_de_empleado,
        this.correo_institucional = correo_institucional,
        this.puesto = puesto,
        this.profesión = profesión,
        this.salario_mensual = salario_mensual
    }
    crearInputs(){
        const inputsType = []

        //se crea un input por cada campo extra de esta clase
        inputsType.push({ 
            key:"código_de_empleado",
            labelText:"código de empleado",
            inputType:"number"
        })
        inputsType.push({ 
            key:"correo_institucional",
            labelText:"correo institucional",
            inputType:"email"
        })

        const inputsCreados = inputsType.map(input => generarInput(input))
        return {inputsCreados}
    }
}
export class Docente extends Persona{
    constructor(      
        {
            tipo_formulario = "Docente",
            primer_nombre = "",
            segundo_nombre = "",
            tercer_nombre = "",
            primer_apellido = "",
            segundo_apellido = "",
            apellido_de_casada = "",
            identificador_único = "",
            fecha_de_nacimiento = "",
            país_de_nacimiento = "",
            departamento_o_provincia_de_nacimiento = "",
            municipio_o_ciudad_de_nacimiento = "",
            correo_electrónico = "",
            teléfono_celular = "",
            teléfono_residencial = "",
            código_de_empleado = "",
            correo_institucional = "",
            puesto = "",
            profesión = "",
            salario_mensual = "",
            cursos = [],
            DPI = "" 
        }
    ){
        super(
            {
                tipo_formulario,
                primer_nombre,
                segundo_nombre,
                tercer_nombre,
                primer_apellido,
                segundo_apellido,
                apellido_de_casada,
                identificador_único,
                fecha_de_nacimiento,
                país_de_nacimiento,
                departamento_o_provincia_de_nacimiento,
                municipio_o_ciudad_de_nacimiento,
                correo_electrónico,
                teléfono_celular,
                teléfono_residencial,
                DPI
            }
        )
        this.código_de_empleado = código_de_empleado,
        this.correo_institucional = correo_institucional,
        this.puesto = puesto,
        this.profesión = profesión,
        this.salario_mensual = salario_mensual,
        this.cursos = cursos
    }
    crearInputs(){
        const inputsType = []

        //se crea un input por cada campo extra de esta clase
        inputsType.push({ 
            key:"código_de_empleado",
            labelText:"código de empleado",
            inputType:"number"
        })
        inputsType.push({ 
            key:"puesto",
            labelText:"puesto",
        })
        inputsType.push({ 
            key:"profesión",
            labelText:"profesión",
        })
        inputsType.push({ 
            key:"salario_mensual",
            labelText:"salario mensual",
            inputType:"number"
        })
        const inputsCreados = inputsType.map(input => generarInput(input))
        const seccionCursos = generarSeccionCursos()
        inputsCreados.push(seccionCursos)
        return {inputsCreados}
    }
    obtenerInfoDeForm(form){
        const data = extraerInfoDeInputs(form)
        data.cursos = extraerCursos(form)
        return data
    }
    resetForm(form){
        form.reset()
        form.querySelectorAll("[data-curso]").forEach(li=>li.parentElement.remove())
    }
    actualizarInputs(){
        const instrucciones = {
            contenedor:"form-tag",
            selector:'input:not([type="submit"])',
            data:this
        }

        buscarYactualizarInputs(instrucciones)

        const form = document.getElementById(instrucciones.contenedor)        
        const ol = form.querySelector("#cursos-impartidos")
        this.cursos.forEach(e=>ol.appendChild(generarElementoCurso(e)))
        
        return {
            exito:true,
            mensaje:"los inputs fueron actualizados correctamente"
        }
    }
}