# API Productos - Servidor Express

Descripción breve

- API simple para gestionar productos (listar, obtener por id, crear, actualizar, eliminar).

Servidor

- Puerto por defecto: `3000`.
- Archivo principal: `server.js`.

Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor (con nodemon si está instalado):

```bash
npm start
# o
npx nodemon server.js
```

Rutas (endpoints)

Base: `http://localhost:3000`

- GET / -> Respuesta de bienvenida
  - Respuesta: `200` with a short welcome message.

- GET /productos -> Obtener todos los productos
  - Respuesta: `200`
  - Body JSON:
    - `title`: string
    - `productos`: array de objetos producto
    - `total_productos`: número

- GET /productos/:id -> Obtener producto por id
  - Parámetros: `id` (número)
  - Respuestas:
    - `200` producto encontrado (objeto)
    - `404` { error: "Producto no encontrado" }

- POST /productos -> Crear nuevo producto
  - Body JSON esperado: `{ "nombre": "...", "precio": 123 }`
  - Respuesta: `201` con `{ message, producto }`

- PUT /productos/:id -> Actualizar producto
  - Body JSON opcional: `{ "nombre": "...", "precio": 123 }`
  - Respuestas:
    - `200` con `{ message, producto }` si se actualizó
    - `404` si no existe

- DELETE /productos/:id -> Eliminar producto
  - Respuestas:
    - `204` No Content si se eliminó
    - `404` si no existe

Formato de datos

- Los productos se cargan desde `productos.json` y se mantienen en memoria durante la ejecución.
- Ejemplo de objeto producto:

```json
{
  "id": 1,
  "nombre": "Producto A",
  "precio": 100
}
```

Ejemplos curl

- Listar productos:

```bash
curl http://localhost:3000/productos
```

- Obtener producto por id (ej. id=1):

```bash
curl http://localhost:3000/productos/1
```

- Crear producto:

```bash
curl -X POST http://localhost:3000/productos \
	-H "Content-Type: application/json" \
	-d '{"nombre":"Nuevo","precio":250}'
```

- Actualizar producto (ej. id=1):

```bash
curl -X PUT http://localhost:3000/productos/1 \
	-H "Content-Type: application/json" \
	-d '{"precio":300}'
```

- Eliminar producto (ej. id=1):

```bash
curl -X DELETE http://localhost:3000/productos/1
```

Colección Postman

- Hay una colección en la carpeta `postman/Productos.postman_collection.json` que puedes importar en Postman.

Notas y consideraciones

- Los cambios se realizan en memoria; para persistencia real deberías escribir a `productos.json` o usar una base de datos.
- Si el servidor no arranca, revisa la consola para mensajes de error. Problemas comunes:
  - Uso de `await` en top-level sin entorno compatible (ya corregido).
  - Ruta al archivo `productos.json` incorrecta.

Contacto

- Si necesitas que añada ejemplos más detallados o endpoints nuevos, dime cuáles.
