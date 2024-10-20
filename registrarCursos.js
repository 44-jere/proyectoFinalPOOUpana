import {eliminarBTNConAnimacion} from "./eliminarBTN.js"

function eliminarElemento(evento){
    let contenedor = evento.target
    while(!contenedor.classList.value.includes("btn-container")){
      contenedor = contenedor.parentElement
    }
    contenedor = contenedor.parentElement
    
    eliminarBTNConAnimacion(contenedor)
}

function agregarCursoEnLista(evento){
    let contenedor = evento.target
    while(!contenedor.classList.value.includes("btn-container")){
      contenedor = contenedor.parentElement
    }
    contenedor = contenedor.parentElement
    const input = contenedor.querySelector("input").value.trim()
    if(input === "") return
    const ol = document.getElementById("cursos-impartidos")
    const li = generarElementoCurso(input)
    ol.appendChild(li)
}

// Función para crear el elemento <li>
export function generarElementoCurso(nombreCurso) {
  // Crear el <li> principal
  const li = document.createElement("li");

  // Crear el primer <span> con el nombre del curso
  const spanNombre = document.createElement("span");
  spanNombre.textContent = nombreCurso;
  spanNombre.dataset.curso = nombreCurso

  // Crear el contenedor del botón
  const spanBtnContainer = document.createElement("span");
  spanBtnContainer.classList.add("btn-container");
  spanBtnContainer.addEventListener("click",eliminarElemento)

  // Crear el ícono SVG
  const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"/>
      </svg>
    `;
  spanBtnContainer.innerHTML = svgIcon;

  // Añadir los <span> al <li>
  li.appendChild(spanNombre);
  li.appendChild(spanBtnContainer);

  // Añadir el <li> al DOM (por ejemplo, dentro de una lista <ol> o <ul>)
  return li;
}

export function generarSeccionCursos() {
  // Crear el contenedor principal <section>
  const section = document.createElement("section");
  section.classList.add("clases-container");

  // Crear el título <h3>
  const h3 = document.createElement("h3");
  h3.textContent = "Cursos";

  // Crear el div principal
  const divPrincipal = document.createElement("div");

  // Crear el div que contiene el <label>
  const labelDiv = document.createElement("div");
  const label = document.createElement("label");
  label.setAttribute("for", "cursos_1");
  label.textContent = "Curso";
  labelDiv.appendChild(label);

  // Crear el input de tipo texto
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "cursos_1");

  // Crear el contenedor del botón
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  btnContainer.addEventListener("click",agregarCursoEnLista)

  // Crear el botón con el ícono SVG
  const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/>
          <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"/>
        </g>
      </svg>
    `;
  btnContainer.innerHTML = svgIcon;

  // Crear la lista ordenada <ol>
  const ol = document.createElement("ol");
  ol.setAttribute("id", "cursos-impartidos");

  // Añadir todos los elementos al div principal
  divPrincipal.appendChild(labelDiv);
  divPrincipal.appendChild(input);
  divPrincipal.appendChild(btnContainer);

  // Añadir los elementos a la sección
  section.appendChild(h3);
  section.appendChild(divPrincipal);
  section.appendChild(ol);

  return section;
}
