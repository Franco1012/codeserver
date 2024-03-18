const fs = require(`fs`)

//modulo crypto para generar códigos aleatorios
const crypto = require(`crypto`);

//ruta donde se va a guardar el archivo
const path = `./fs/files/users.json`

class UserManager {
    constructor() {
        this.path = path;
        this.init();
    }

    init() {
        try {
            // Verificar si el archivo existe
            if (!fs.existsSync(this.path)) {
                const stringData = JSON.stringify([], null, 2);
                fs.writeFileSync(this.path, stringData);
                console.log("Se creó el archivo");
            } else {
                console.log("El archivo ya existe");
            }
        } catch (err) {
            console.error("Error al inicializar:", err);
        }
    }

    async create(data) {
        //se desestructura el objeto
        const { photo, email, password } = data
        // Si no se proporciona una imagen, establecer una imagen por defecto
        const defaultPhoto = 'default.jpg';
        try {
            if (email && password) {
                const user = {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: photo || defaultPhoto,
                    email: email,
                    password: password,
                    role: 0
                }
                //se lee el contenido del archivo ubicado en la ruta path y lo guarda en la variable users
                let users = await fs.promises.readFile(this.path, "utf8")
                //se convierte el contenido del archivo ,que es una cadena json , en un objeto
                users = JSON.parse(users)
                //se agrega el usuario creado al array de objetos
                users.push(user)
                //se convierte el array de objetos en una cadena json
                users = JSON.stringify(users, null, 2)
                //se sobrescribe el contenido del archivo
                await fs.promises.writeFile(this.path, users)
                console.log(`usuario creado`)


            } else {
                //se recorre las propiedades del objeto con un bucle for in en búsqueda de una propiedad vacía
                function buscarPropiedadVacia() {
                    for (let prop in data) {
                        if (data[prop] === '') {
                            const propiedadVacia = prop;
                            //se lanza una excepción
                            return propiedadVacia
                        }
                    }
                }
                const propiedadVacia = buscarPropiedadVacia()
                //si existe un propiedad vacía se maneja el error 
                if (propiedadVacia) {
                    throw new Error(`No se han introducido  los datos en la propiedad ${propiedadVacia}`)
                } else {
                    throw new Error(`la propiedad no existe`)
                }


            }

        }
        //se captura la excepción y se maneja el error
        catch (error) {
            console.log(`ocurrió un error:${error.message}`)
        }

    }
    async read() {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8")
            users = JSON.parse(users)
            //se verifica si el array tiene elementos
            if (users.length !== 0) {
                console.log(users)
                return users
            } else {
                throw new Error(`No hay usuarios`)
            }
        }
        catch (error) {
            console.log(`Ocurrió un error: ${error.message}`)
        }
    }
    async readOne(id) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8")
            users = JSON.parse(users)
            if (users.length !== 0) {
                //se utiliza el método find para encontrar el usuario cuyo id coincide con el id que se pasa por parámetro en el método readOne
                let one = users.find((user) => user.id === id)
                if (one) {
                    console.log(one)
                    return one
                } else {
                    throw new Error(`No se encontró el usuario`)
                }
            } else {
                throw new Error(`No hay usuarios`)
            }
        }
        catch (error) {
            console.log(`Ocurrió un error: ${error.message}`)
        }
    }
    async destroy(id) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8")
            users = JSON.parse(users)
            if (users.length !== 0) {
                let one = users.find((user) => user.id === id)
                //verificamos que exista el usuario a eliminar
                if (one) {
                    //filtramos los usuarios cuyo id No coincidan con el id que se pasa como parámetro del método destroy
                    let filtered = users.filter((user) => user.id !== id)
                    filtered = JSON.stringify(filtered, null, 2)
                    await fs.promises.writeFile(this.path, filtered)
                    console.log(`usuario eliminado`)
                    return filtered
                } else {
                    throw new Error(`No se encontró el usuario`)
                }
            } else {
                throw new Error(`No hay usuarios`)
            }
        }
        catch (error) {
            console.log(`Ocurrió un error: ${error.message}`)
        }
    }
}

async function test() {
    try {
        const gestorDeUsuarios = new UserManager();
        await gestorDeUsuarios.create({
            photo: ``,
            email: 'soler_franco@hotmail.com',
            password: 'franco1234'
        });
        await gestorDeUsuarios.read();
        await gestorDeUsuarios.readOne("6c4eb6b65642c7e55c533719")
        await gestorDeUsuarios.destroy("45fd22cf0e699b4973d696e5")

    }
    catch (error) {
        console.log(error)
    }
}
test()





