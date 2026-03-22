const botones = document.querySelectorAll('.buttonproductos');

botones.forEach(boton => {
  boton.addEventListener('click', function(e) {
    const idSleccionado = e.currentTarget.id;
    const productoSelect = tazas.find(taza => taza.id === Number(idSleccionado));
    agregarAlCarrito(productoSelect);
  })
});