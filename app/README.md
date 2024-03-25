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
- Configuración de Router: Se configuraron rutas tanto para el gestor de productos como para el gestor de usuarios.
  - Ruta de Productos: `localhost:8080/api/products`
  - Ruta de Usuarios: `localhost:8080/api/users`
  - Búsqueda por ID: `localhost:8080/api/products/pid` / `localhost:8080/api/products/uid`
  -Ruta para crear productos:`localhost:8080/api/products/create/title/photo/category/price/stock`
  -Ruta para crear usuarios: `localhost:8080/api/users/create/photo/email/password`    
  -Ruta para eliminar productos: `localhost:8080/api/products/delete/pid`        
  -Ruta para eliminar usuarios: `localhost:8080/api/users/delete/uid`   
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
