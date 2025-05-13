// backend/server.js

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./database/db'); // Conexión a MySQL

const PORT = 3000;

// Middleware
app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Para leer JSON en peticiones
app.use(express.urlencoded({ extended: true })); // Formularios
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir imágenes

// Ruta de prueba
app.get('/api/cuadros', (req, res) => {
  db.query('SELECT * FROM cuadros', (err, results) => {
    if (err) {
      console.error('Error al obtener cuadros:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json(results);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

//CARRITO

app.use(express.json()); // Para que Express pueda manejar solicitudes JSON

// Ruta para añadir al carrito
app.post('/carrito', (req, res) => {
  const { productoId, cantidad } = req.body;

  // Aquí deberías guardar en la base de datos el producto y la cantidad
  // Asegúrate de verificar si el usuario está logueado y almacenar el carrito en su cuenta

  res.status(200).send('Producto añadido al carrito');
});

// Ruta para obtener el carrito
app.get('/carrito', (req, res) => {
  // Aquí obtienes los productos en el carrito del usuario
  res.status(200).json({ carrito: [] }); // Retorna el carrito (esto será dinámico con MySQL)
});
