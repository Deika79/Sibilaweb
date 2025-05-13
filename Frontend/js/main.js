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

// Función para mostrar mensajes toast modernos
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast');

  // Si no existe el contenedor, lo creamos
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = mensaje;
  toast.classList.add('show');

  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

//Añadir cuadros del json
document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.querySelector('.cuadros-grid');

  try {
    const res = await fetch('http://localhost:3000/data/cuadros.json');
    const cuadros = await res.json();

    cuadros.forEach(cuadro => {
      const div = document.createElement('div');
      div.classList.add('cuadro');
      div.innerHTML = `
        <img src="${cuadro.imagen}" alt="${cuadro.nombre}">
        <h3>${cuadro.nombre}</h3>
        <p>${cuadro.descripcion}</p>
        <strong>${cuadro.precio} €</strong>
        <button onclick="agregarAlCarrito('${cuadro.nombre}', ${cuadro.precio}, '${cuadro.imagen}')">Añadir al carrito</button>
        <a class="boton-vermas" href="detalle.html?id=${cuadro.id}">Ver más</a>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar los cuadros:", error);
  }
});

