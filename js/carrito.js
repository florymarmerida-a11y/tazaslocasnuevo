/*Funcion para obtener los productos previamente ingresados al carrito*/
function obtenerListaCarrito() {
    const memoria = JSON.parse(localStorage.getItem("tazasLS"));
    const listaCarrito = document.getElementById("listaCarrito");
    if (!memoria) {
        console.log("no hay productos");
        listaCarrito.innerHTML += `
            <article class="contenedorflearticle">
            <p class="productoparrafo">No hay productos en el carrito</p>
            </article>
        `;
    } else {
        console.log("si hay productos");
        memoria.forEach((taza) => {
            listaCarrito.innerHTML += `
            <article class="contenedorflearticlecarrito">
            <img class="Tazaimagen-Index img-fluid" src="${taza.imagen}">
            <h3 class="Index-h3productos">${taza.nombre}</h3>
            <p class="productoparrafo"><span>$</span>${taza.precio}</p>
            <p class="productoparrafo" ><span>Cantidad: </span>${taza.cantidad}</p>
            <button class="buttonEliminar" id="${taza.id}"> Eliminar</button>
            </article>
        `;
        });
        actualizarTotales();
    }
}

obtenerListaCarrito();

/*Funcion para sumar las cantidades y precio total*/
function actualizarTotales() {
    const memoria = JSON.parse(localStorage.getItem("tazasLS"));

    let totalCantidad = 0;
    let totalPrecio = 0;

    if (memoria) {
        memoria.forEach(function (taza) {
            totalCantidad += Number(taza.cantidad);
            totalPrecio += Number(taza.precio) * Number(taza.cantidad);
        });
    }

    const totales = document.getElementById("totales");
    totales.innerHTML = `
    <p>Total Cantidad <span id="cantidad">${totalCantidad}</span></p>
    <p>Total Precio:$ <span id="precio">${totalPrecio}</span></p>
    <button class="finalizarcompra" id="finalizocompra">Comprar</button>
    `;
    totales.hidden = false;
}

/*Funcion para eliminar producto del carrito*/
function eliminarProducto(id) {
    const memoria = JSON.parse(localStorage.getItem("tazasLS"));

    const nuevoArray = memoria.filter(function (taza) {
        return taza.id != id;
    });

    if (nuevoArray.length === 0) {
        document.getElementById("totales").hidden = true;
        localStorage.clear();
    } else {
        localStorage.setItem("tazasLS", JSON.stringify(nuevoArray));
    };

    location.reload();
}

/*Funcion para simular la finalizacion de la compra*/
function finalizarCompra() {
    alert("Compra realizada con éxito 🎉");
    localStorage.clear();
    location.reload();
}

const botonComprar = document.getElementById("finalizocompra");
const botonFinCompra = document.getElementById('btnFinCompra');
const botonesEliminar = document.querySelectorAll('.buttonEliminar');

if (botonComprar) {
    botonComprar.addEventListener("click", function () {
        const formularioCompra = document.getElementById("formCompra");
        formularioCompra.hidden = false;
    });
}

if (botonFinCompra) {
    botonFinCompra.addEventListener('click', function () {
        finalizarCompra();
    });
}

botonesEliminar.forEach(boton => {
    boton.addEventListener('click', function (e) {
        const idSleccionado = e.currentTarget.id;
        eliminarProducto(idSleccionado);
    })
});