document.addEventListener('DOMContentLoaded', () => {
  const items = JSON.parse(localStorage.getItem('carrito')) || [];
  const contenedor = document.getElementById('carrito-items');
  const totalElemento = document.getElementById('total');

  function actualizarTotal() {
    const total = items.reduce((acc, item) => acc + item.precio, 0);
    totalElemento.textContent = `${total}€`;
  }

  function renderItems() {
    contenedor.innerHTML = '';
    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('item');
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="item-info">
          <h4>${item.nombre}</h4>
          <p class="precio">${item.precio}€</p>
        </div>
        <button class="boton-eliminar" data-index="${index}">×</button>
      `;
      contenedor.appendChild(div);
    });
    actualizarTotal();
  }

  contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-eliminar')) {
      const index = e.target.dataset.index;
      items.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(items));
      renderItems();
    }
  });

  renderItems();
});
