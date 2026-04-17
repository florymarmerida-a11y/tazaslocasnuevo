const botonesAddCar = document.querySelectorAll('.botonAddCar');
let tazas
fetch('../json/tazas.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        tazas = data
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Oops... Ocurrio un problema Inesperado",
            text: " ¡Intente mas tarde!",
        });
    });

botonesAddCar.forEach(boton => {
    boton.addEventListener('click', function (e) {
        const idSleccionado = e.currentTarget.id;
        const productoSelect = tazas.find(taza => taza.id === Number(idSleccionado));
        agregarAlCarrito(productoSelect);
    })
});

/*Funcion que agrega productos al carrito*/
function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("tazasLS"));
    if (!memoria) {
        const nuevoProducto = crearNuevoProducto(producto);
        localStorage.setItem("tazasLS", JSON.stringify([nuevoProducto]));
    }
    else {
        const indiceProducto = memoria.findIndex(tazaLS => tazaLS.id === producto.id);
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(crearNuevoProducto(producto));
        } else {
            nuevaMemoria[indiceProducto].cantidad++;
        }
        localStorage.setItem("tazasLS", JSON.stringify(nuevaMemoria));
    }
    actualizarConteo();
}

/*Funcion para crear nuevo producto y agregar cantidad 1*/
function crearNuevoProducto(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

/*Funcion para actualizar el conteo de productos del carrito*/
function actualizarConteo() {
    const memoria = JSON.parse(localStorage.getItem("tazasLS"));
    if (memoria) {
        const cuenta = memoria.reduce((acum, current) => acum + (current.cantidad || 0), 0);
        document.getElementById("contadorCarrito").innerText = cuenta;
    }
}

actualizarConteo();