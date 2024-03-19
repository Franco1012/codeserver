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

Para ejecutar el código de esta aplicación, primero debes asegurarte de tener Node.js instalado en tu sistema. Luego, sigue estos pasos:

Clona el repositorio o descarga el código fuente de la aplicación en tu máquina.

Abre una terminal y navega hasta el directorio donde se encuentra el código de la aplicación.

Instala las dependencias necesarias ejecutando el siguiente comando:
npm install

Una vez que hayas instalado las dependencias, puedes ejecutar la aplicación Node.js utilizando el siguiente comando en tu terminal:

node <ruta_al_archivo>
Asegúrate de reemplazar <ruta_al_archivo> con la ruta del archivo que contiene el código a ejecutar.


Asegúrate de que tu código implemente correctamente todas las funcionalidades mencionadas en la descripción del proyecto.





