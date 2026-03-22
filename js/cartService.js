function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("tazasLS"));
    console.log(memoria);
    if (!memoria) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("tazasLS", JSON.stringify([nuevoProducto]));
    }
    else {
        const indiceProducto = memoria.findIndex(tazaLS => tazaLS.id === producto.id);
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
        } else {
            nuevaMemoria[indiceProducto].cantidad++;
        }
        localStorage.setItem("tazasLS", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
}

/** Tomar nuevo producto , le agrega cantidad 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

 /**cuenta carrto  */
const cuentaCarritoElement = document.getElementById("contadorCarrito");
function actualizarNumeroCarrito(){
    const memoria=JSON.parse (localStorage.getItem("tazasLS"));
    const cuenta = memoria.reduce ((acum, current)=> acum+(current.cantidad || 0),0);
    cuentaCarritoElement.innerText = cuenta;
} 