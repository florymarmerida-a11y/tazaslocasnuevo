function crearTarjetasProductosCarrito() {
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
            <article class="contenedorflearticle">
            <img class="Tazaimagen-Index img-fluid" src="${taza.imagen}">
            <h3 class="Index-h3productos">${taza.nombre}</h3>
            <p class="productoparrafo">${taza.precio}</p>
            <p class="productoparrafo" >${taza.cantidad}</p>
            <button class="buttonEliminar" id="${taza.id}"> Eliminar</button>
            </article>

        `;
        });
        actualizarTotales();
    }
}

crearTarjetasProductosCarrito();

/* Sumar Totales */

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
    <button class="finalizarcompra" id="finalizocompra"> Finalizar Compra</button>
    `;
    totales.hidden = false;
}

/*Eliminar producto del carrito */

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

/* formulario dinamico - Finalizar compra*/
document.getElementById("tazasLS").addEventListener("click", function () {

    const memoria = JSON.parse(localStorage.getItem("tazasLS"));

    // Validar carrito vacío
    if (!memoria || memoria.length === 0) {
        alert("El carrito está vacío 🛒");
        return;
    }

    const contenedor = document.getElementById("contenedorFormulario");

    contenedor.innerHTML = `
        <form id="formCompra">
            <h2>Datos Personales</h2>
            
            <input type="text" placeholder="Nombre" required>
            <input type="email" placeholder="Email" required>
            <input type="text" placeholder="Dirección" required>

            <h2>Datos de Pago</h2>

            <input type="text" placeholder="Número de tarjeta" required>
            <input type="text" placeholder="Fecha de vencimiento" required>
            <input type="text" placeholder="CVV" required>

            <button type="submit">Finalizar Compra</button>
        </form>
    `;
});

document.addEventListener("submit", function(e) {
    if (e.target.id === "formCompra") {
        e.preventDefault();

        alert("Compra realizada con éxito 🎉");

        localStorage.removeItem("tazasLS");

        document.getElementById("contenedorFormulario").innerHTML = "";

        crearTarjetasProductosCarrito();
        actualizarTotales();
    }
});
