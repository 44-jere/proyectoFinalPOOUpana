export function eliminarBTNConAnimacion(selector,callback){
    selector.classList.add("animacion-eliminar")
    // Iniciar la animación cambiando el estado de la misma
    selector.style.animationPlayState = 'running';

    // Esperar hasta que la animación termine antes de eliminar el selector
    selector.addEventListener('animationend', () => {
        selector.remove(); // Eliminar el elemento del DOM
        if(!!callback){
            callback()
        }
    });
}