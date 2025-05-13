document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  fetch('http://localhost:3000/database/cuadros.json')
    .then(res => res.json())
    .then(cuadros => {
      const cuadro = cuadros.find(c => c.id == id);
      if (cuadro) {
        const contenedor = document.getElementById('detalle-cuadro');
        contenedor.innerHTML = `
          <img src="${cuadro.imagen}" alt="${cuadro.nombre}">
          <h1>${cuadro.nombre}</h1>
          <p>${cuadro.descripcion}</p>
          <p class="precio">${cuadro.precio}€</p>
          <button onclick="agregarAlCarrito('${cuadro.nombre}', ${cuadro.precio}, '${cuadro.imagen}')">Añadir al carrito</button>
        `;
      } else {
        document.getElementById('detalle-cuadro').innerHTML = "<p>Cuadro no encontrado</p>";
      }
    })
    .catch(err => {
      console.error("Error al cargar los datos:", err);
      document.getElementById('detalle-cuadro').innerHTML = "<p>Error al cargar el cuadro</p>";
    });
});

function agregarAlCarrito(nombre, precio, imagen) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.some(item => item.nombre === nombre)) {
    mostrarToast("Este cuadro ya está en el carrito.");
    return;
  }

  carrito.push({ nombre, precio, imagen });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarToast("Cuadro añadido al carrito");
}

function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
