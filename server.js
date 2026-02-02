const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();

const PORT = 3000;

// Middleware para interpretar formato JSON
app.use(express.json());

// Base de Datos Json.
let productos = [];
async function cargarProductos() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "productos.json"),
      "utf-8",
    );
    const json = JSON.parse(data);
    return json.productos;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function guardarProductos(productos) {
  try {
    const data = JSON.stringify({ productos: productos }, null, 2);
    await fs.writeFile(path.join(__dirname, "productos.json"), data, "utf-8");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Cargar productos al iniciar el servidor

cargarProductos().then((data) => {
  productos = data;
});

//Enrutadores
app.get("/", (req, res) => {
  res.status(200).json("Bienvenidos");
});

// GET - Obtengo todos los productos
app.get("/productos", (req, res) => {
  res.status(200).json({
    title: "Lista de productos",
    productos: productos,
    total_productos: productos.length,
  });
});

// GET - Obtener un producto por su id.
app.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("ID Consultado: ", id);
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(200).json(producto);
});

// POST - Agregar un producto nuevo
app.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;
  const nuevo = {
    id: productos.length ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio,
  };
  productos.push(nuevo);
  res
    .status(201)
    .json({ message: "Producto creado con exito.!", producto: nuevo });
  guardarProductos(productos);
});

// PUT - Modificar un producto
app.put("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio } = req.body;
  console.log("ID Consultado: ", id);
  const producto = productos.find((p) => p.id === id);
  if (!producto)
    return res.status(404).json({ error: "Producto no encontrado" });

  producto.nombre = nombre ?? producto.nombre;
  producto.precio = precio ?? producto.precio;

  res
    .status(200)
    .json({ message: "Producto actualizado con exito.!", producto: producto });
  guardarProductos(productos);
});

// DELETE - Eliminar un producto
app.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);
  if (!producto)
    return res.status(404).json({ error: "Producto no encontrado" });
  productos = productos.filter((p) => p.id !== id);
  res.status(204).send(); // No Content
  guardarProductos(productos);
});

// Iniciar el Servidor
app.listen(PORT, () =>
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`),
);
