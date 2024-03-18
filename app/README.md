# codeserver
Gestor de Productos y Usuarios
Este proyecto consiste en una aplicación Node.js que proporciona funcionalidades para la gestión de productos y usuarios. La aplicación está diseñada para manejar datos tanto en memoria como en el sistema de archivos.

Funcionalidades
Gestión de Productos
Crear Producto: Agrega un nuevo producto con propiedades como ID, título, foto, categoría, precio y stock.
Leer Productos: Recupera todos los productos disponibles.
Leer Producto por ID: Encuentra y devuelve un producto específico según su ID.
Eliminar Producto: Elimina un producto según su ID.
Gestión de Usuarios
Crear Usuario: Agrega un nuevo usuario con propiedades como ID, foto, email, contraseña y rol.
Leer Usuarios: Recupera todos los usuarios registrados.
Leer Usuario por ID: Encuentra y devuelve un usuario específico según su ID.
Eliminar Usuario: Elimina un usuario según su ID.
Implementación
Manejo de Errores: Se utiliza try/catch para manejar errores en todas las operaciones CRUD.
Almacenamiento de Datos: Las clases ProductsManager y UsersManager ofrecen la capacidad de manejar datos tanto en memoria como en el sistema de archivos.
Ejecución del Código: El programa puede ejecutarse utilizando el comando node app.js en la terminal.
Uso
Clona este repositorio en tu máquina local.
Instala las dependencias necesarias con npm install.
Ejecuta el programa con node app.js para comenzar a utilizar la aplicación.
Notas
Asegúrate de tener instalado Node.js en tu sistema antes de ejecutar la aplicación.
Para modificar la configuración o ampliar las funcionalidades, consulta el código fuente en los archivos ProductsManager.js, UsersManager.js y app.js.