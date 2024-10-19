import {eliminarBTNConAnimacion} from "./eliminarBTN.js"
function eliminarElemento(evento){
  const contenedor = evento.target.parentElement.parentElement.parentElement.parentElement
  contenedor.style.setProperty('--aside-child-background', '#b71c1c');
  eliminarBTNConAnimacion(contenedor)
}
export function generarLi(data) {
  // Crear el <li> principal
  const li = document.createElement("li");
  li.className = "previous-info";

  // Crear el contenedor de detalles
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "previous-info-details-container";

  // Crear el <h4> con los nombres
  const nameHeader = document.createElement("h4");
  nameHeader.className = "previous-info-name";

  // Crear el primer <span> de manera segura
  const span1 = document.createElement("span");
  const strong1 = document.createElement("strong");
  strong1.textContent = data.primer_nombre;
  span1.appendChild(strong1);

  // Crear el segundo <span> de manera segura
  const span2 = document.createElement("span");
  const strong2 = document.createElement("strong");
  strong2.textContent = data.segundo_nombre;
  span2.appendChild(strong2);

  // Añadir los <span> al <h4>
  nameHeader.appendChild(span1);
  nameHeader.appendChild(span2);

  // Crear el <p> con el teléfono
  const phoneParagraph = document.createElement("p");
  phoneParagraph.className = "previous-info-phone";
  phoneParagraph.textContent = `tel: ${data.teléfono_celular}`;

  // Crear el <p> con el ID
  const idParagraph = document.createElement("p");
  idParagraph.className = "previous-info-id";
  idParagraph.textContent = `ID: ${data.identificador_único}`;

  // Añadir el contenido al contenedor de detalles
  detailsContainer.appendChild(nameHeader);
  detailsContainer.appendChild(phoneParagraph);
  detailsContainer.appendChild(idParagraph);

  // Crear el contenedor de los iconos
  const iconsContainer = document.createElement("div");
  iconsContainer.className = "previous-info-icons-contaienr";

  // Crear el primer botón con su SVG
  const deleteButton = document.createElement("button");
  deleteButton.dataset.deletebtn = data.identificador_único
  deleteButton.addEventListener("click",eliminarElemento)
  deleteButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"/>
  </svg>
  `;

  // Crear el segundo botón con su SVG
  const editButton = document.createElement("button");
  editButton.dataset.updatebtn = data.identificador_único
  editButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.1 2.1 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621"/>
      <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"/>
    </g>
  </svg>
  `;

  // Añadir los botones al contenedor de iconos
  iconsContainer.appendChild(deleteButton);
  iconsContainer.appendChild(editButton);

  // Añadir los contenedores al <li>
  li.appendChild(detailsContainer);
  li.appendChild(iconsContainer);

  // Finalmente, añadir el <li> al DOM, por ejemplo, a una lista con id "myList"
  return li;
}
