// se cambian los colores de root del css
function cambiarColor(variableCSS, color) {
  document.documentElement.style.setProperty(variableCSS, color); // color anaranjado para el <aside>
}

export function colorAlActualizar() {
  cambiarColor("--aside-background", "#FFA500");
  cambiarColor("--aside-child-background", "#FF8C00");
}

export function colorPorDefecto() {
  cambiarColor("--aside-background", "#4b5195");
  cambiarColor("--aside-child-background", "#3c427a");
}