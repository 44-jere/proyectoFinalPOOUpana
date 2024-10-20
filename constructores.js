import {generarLi} from "./LIgenerador.js"
import {buscarYactualizarInputs} from "./acualizadorInputs.js"
import {generarInput} from "./inputGenerador.js"
import {generarSeccionCursos} from "./registrarCursos.js"
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
            teléfono_residencial = ""
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
        this.teléfono_residencial = teléfono_residencial
    }
    validarCampos(){
        if(this.primer_nombre === "") campoNoDado("campo primer nombre no dado")
        if(this.primer_apellido === "") campoNoDado("campo primer apellido no dado")
        if(this.identificador_único === "") campoNoDado("campo identificador único no dado")
        if(this.fecha_de_nacimiento === "") campoNoDado("campo fecha de nacimiento no dado")
        if(this.país_de_nacimiento === "") campoNoDado("campo país de nacimiento no dado")
        if(this.departamento_o_provincia_de_nacimiento === "") campoNoDado("departamento o provincia de nacimiento")
        if(this.municipio_o_ciudad_de_nacimiento === "") campoNoDado("municipio o ciudad de nacimiento")
    }
    deletePerson(id){
        const listPersons = JSON.parse(localStorage.getItem("forms"))
        const index = listPersons.findIndex(person=>person.identificador_único === id)
        if (index !== -1) {
            console.log(listPersons.length,"en el metodo")
            listPersons.splice(index, 1)
            console.log(listPersons.length,"en el metodo")
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
        console.log(listPersons)
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
    actualizarInputs(data){
        const instrucciones = {
            contenedor:"form-tag",
            selector:"input",
            data
        }

        buscarYactualizarInputs(data)
        
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
            número_de_carnet = ""            
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
                teléfono_residencial
            }
        )
        this.correo_institucional = correo_institucional,
        this.número_de_carnet = número_de_carnet
    }
    esMayor(){
        //devuelve tue si es mayor y false si es menor
        const fechaNacimiento = new Date(this.fecha_de_nacimiento)
        const hoy = new Date()
        const esMayor = new Date()
        esMayor.setDate(hoy.getDate() - fechaNacimiento.getDate())
        esMayor.setMonth(hoy.getMonth() - fechaNacimiento.getMonth())
        esMayor.setFullYear(hoy.getFullYear() - fechaNacimiento.getFullYear())
        return esMayor.getFullYear() >=18
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
            salario_mensual = ""
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
            cursos = []
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
                teléfono_residencial
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
}