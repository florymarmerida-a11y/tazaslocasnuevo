const botonesComprar = document.querySelectorAll('.buttonproductos');
const botonesEliminar = document.querySelectorAll('.buttonEliminar');

botonesComprar.forEach(boton => {
  boton.addEventListener('click', function(e) {
    const idSleccionado = e.currentTarget.id;
    const productoSelect = tazas.find(taza => taza.id === Number(idSleccionado));
    agregarAlCarrito(productoSelect);
  })
});

botonesEliminar.forEach(boton => {
  boton.addEventListener('click', function(e) {
    const idSleccionado = e.currentTarget.id;
    eliminarProducto(idSleccionado);
  })
});