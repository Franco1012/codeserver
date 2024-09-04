# codeserver

Gestor de Productos y Usuarios

Este proyecto consiste en una aplicación Node.js que proporciona funcionalidades para la gestión de productos y usuarios. La aplicación está diseñada para manejar datos tanto en memoria como en el sistema de archivos.

## Funcionalidades

### Gestión de Productos

- Crear Producto: Agrega un nuevo producto con propiedades como ID, título, foto, categoría, precio y stock.
- Leer Productos: Recupera todos los productos disponibles.
- Leer Producto por ID: Encuentra y devuelve un producto específico según su ID.
- Eliminar Producto: Elimina un producto según su ID.

### Gestión de Usuarios

- Crear Usuario: Agrega un nuevo usuario con propiedades como ID, foto, email, contraseña y rol.
- Leer Usuarios: Recupera todos los usuarios registrados.
- Leer Usuario por ID: Encuentra y devuelve un usuario específico según su ID.
- Eliminar Usuario: Elimina un usuario según su ID.

## Implementación

- Manejo de Errores: Se utiliza try/catch para manejar errores en todas las operaciones CRUD.
- Almacenamiento de Datos: Las clases ProductsManager y UsersManager ofrecen la capacidad de manejar datos tanto en     memoria como en el sistema de archivos.
- Servidor con Express: Se agregó un servidor Express para manejar las solicitudes HTTP.
- Enrutamiento: Utiliza el enrutador de Express para organizar los endpoints de manera modular.
-La aplicación utiliza Handlebars para crear las vistas y WebSocket para ver los productos en tiempo real:
localhost:8080/ 
localhost:8080/products/real
localhost:8080/users/:uid 
localhost:8080/users/register 

Middleware
Implementa middleware para el manejo de errores, solicitudes de rutas no encontradas y registro de solicitudes.
- errorHandler: Maneja los errores generados por la aplicación.
- pathHandler: Maneja el error de las solicitudes de  rutas no encontradas.
-morgan:Registra información sobre las solicitudes recibidas por la API.

Endpoints

- GET /productos: Obtiene todos los productos.
- GET /productos/:id: Obtiene un producto por su ID.
- POST /productos: Crea un nuevo producto.
- PUT /productos/:id: Actualiza un producto existente por su ID.
- DELETE /productos/:id: Elimina un producto por su ID.

- GET /usuarios: Obtiene todos los usuarios.
- GET /usuarios/:id: Obtiene un usuario por su ID.
- POST /usuarios: Crea un nuevo usuario.
- PUT /usuarios/:id: Actualiza un usuario existente por su ID.
- DELETE /usuarios/:id: Elimina un usuario por su ID.
## Ejecución

Para ejecutar el código de esta aplicación, primero debes asegurarte de tener Node.js instalado en tu sistema. Luego, sigue estos pasos:

1. Clona el repositorio o descarga el código fuente de la aplicación en tu máquina.
2. Abre una terminal y navega hasta el directorio donde se encuentra el código de la aplicación.
3. Instala las dependencias necesarias ejecutando el siguiente comando:
   npm install

4. Una vez que hayas instalado las dependencias, puedes ejecutar la aplicación Node.js utilizando el siguiente comando en tu terminal:
   npm run dev

Asegúrate de reemplazar `<ruta_al_archivo>` con la ruta del archivo que contiene el código a ejecutar.

Asegúrate de que tu código implemente correctamente todas las funcionalidades mencionadas en la descripción del proyecto
