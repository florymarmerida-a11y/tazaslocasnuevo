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

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
    });

    location.reload();
}



/*Funcion para simular la finalizacion de la compra*/
function finalizarCompra(event) {
    event.preventDefault();
    const formCompraNombre = document.getElementById('formCompraNombre');
    const formCompraEmail = document.getElementById('formCompraEmail');
    const formCompraDireccion = document.getElementById('formCompraDireccion');
    const formCompraTarjeta = document.getElementById('formCompraTarjeta');
    const formCompraFecha = document.getElementById('formCompraFecha');
    const formCompraCVV = document.getElementById('formCompraCVV');

    const datoNombre = formCompraNombre.value;
    const datoEmail = formCompraEmail.value.trim();
    const datoDireccion = formCompraDireccion.value.trim();
    const datoTarjeta = formCompraTarjeta.value.trim();
    const datoFecha = formCompraFecha.value.trim();
    const datoCVV = formCompraCVV.value.trim();

    if (!datoNombre) {
        return Swal.fire("Error", "Complete Nombre y Apellido", "error");
    }

    if (!datoEmail) {
        return Swal.fire("Error", "Ingrese un email válido", "error");
    }

    if (!datoDireccion) {
        return Swal.fire("Error", "Ingrese la dirección", "error");
    }

    if (!datoTarjeta) {
        return Swal.fire("Error", "Ingrese el número de tarjeta", "error");
    }

    if (!datoFecha) {
        return Swal.fire("Error", "Ingrese la fecha de vencimiento de su tarjeta", "error");
    }

    if (!datoCVV) {
        return Swal.fire("Error", "CVV inválido, ingrese de nuevo.", "error");
    }

    Swal.fire("Compra realizada con éxito 🎉!").then((resultado) => {
        if (resultado.isConfirmed) {
            localStorage.clear();
            location.reload();
        }
    });
}





const botonComprar = document.getElementById("finalizocompra");
const botonesEliminar = document.querySelectorAll('.buttonEliminar');



if (botonComprar) {
    botonComprar.addEventListener("click", function () {
        const formularioCompra = document.getElementById("formCompra");
        formularioCompra.hidden = false;
    });
}

botonesEliminar.forEach(boton => {
    boton.addEventListener('click', function (e) {
        const idSleccionado = e.currentTarget.id;
        eliminarProducto(idSleccionado);
    })
});