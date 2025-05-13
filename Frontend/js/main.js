function agregarAlCarrito(nombre, precio, imagen) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.some(item => item.nombre === nombre)) {
    alert("Este cuadro ya está en el carrito.");
    return;
  }

  carrito.push({ nombre, precio, imagen });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert("Cuadro añadido al carrito");
}
