import fs from "fs"

//modulo crypto para generar códigos aleatorios
import crypto from "crypto";

//ruta donde se va a guardar el archivo
const path = `./src/app/fs/files/users.json`

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


        try {

            if (data.email || data.password) {
                //se lee el contenido del archivo ubicado en la ruta path y lo guarda en la variable users
                let users = await fs.promises.readFile(this.path, "utf8")
                //se convierte el contenido del archivo ,que es una cadena json , en un objeto
                users = JSON.parse(users)
                //se agrega el usuario creado al array de objetos
                users.push(data)
                //se convierte el array de objetos en una cadena json
                users = JSON.stringify(users, null, 2)
                //se sobrescribe el contenido del archivo
                await fs.promises.writeFile(this.path, users)
                console.log(`usuario creado`)
                return data

            }

        }
        //se captura la excepción y se maneja el error
        catch (error) {
            throw error
        }

    }
    async read(filter) {
        const { role } = filter
        try {
            let users = await fs.promises.readFile(this.path, "utf-8")
            users = JSON.parse(users)

            // Comprobar si role es un valor válido antes de filtrar
            if (role !== undefined && role !== null && role !== '') {

                users = users.filter(user => user.role === parseInt(role));

            }

            return users

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    //programar paginate en fs
    async readOne(id) {
        try {
            let filter={}
            let users = await this.read(filter)

            //se utiliza el método find para encontrar el usuario cuyo id coincide con el id que se pasa por parámetro en el método readOne
            let one = users.find((user) => user._id === id)

            return one

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    async readByEmail(email) {
        try {
            let users = await fs.promises.readFile(this.path, "utf-8");
            users = JSON.parse(users);
            let one = users.find((user) => user.email === email);
            return one;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async update(id, data) {
        try {

            let users = await this.read()
            let user = users.find(u => u.id === id)
            console.log("user", user)

            if (user) {
                for (let prop in data) {
                    user[prop] = data[prop]
                }

                users = JSON.stringify(users, null, 2)
                await fs.promises.writeFile(this.path, users)
                console.log("usuario actualizado")
                return user

            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            throw error

        }
    }

    async destroy(id) {
        try {
            let users = await this.read()

            let one = users.find((user) => user.id === id)
            //verificamos que exista el usuario a eliminar
            if (one) {
                //filtramos los usuarios cuyo id No coincidan con el id que se pasa como parámetro del método destroy
                let filtered = users.filter((user) => user.id !== id)
                filtered = JSON.stringify(filtered, null, 2)
                await fs.promises.writeFile(this.path, filtered)
                console.log(`usuario eliminado`)
                return one
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }

        }
        catch (error) {
            throw error
        }
    }
    //agregar aggregate

}



/*async function test() {
    try {
        const gestorDeUsuarios = new UserManager();
        await gestorDeUsuarios.create({
            photo: `franco.jpg`,
            email: 'soler_franco@hotmail.com',
            password: 'franco1234'
        })


        await gestorDeUsuarios.create({
            photo: 'ana.jpg',
            email: 'kocian_ana@hotmail.com',
            password: 'Ana1234'
        })
        await gestorDeUsuarios.create({
            photo: `Matilda.jpg`,
            email: 'soler_Matilda@hotmail.com',
            password: 'franco1234'
        })


        await gestorDeUsuarios.create({
            photo: 'Pedro.jpg',
            email: 'Pedro@hotmail.com',
            password: 'Ana1234'
        })
        await gestorDeUsuarios.read();
        await gestorDeUsuarios.readOne("6c4eb6b65642c7e55c533719")
        await gestorDeUsuarios.destroy("45fd22cf0e699b4973d696e5")

    }
    catch (error) {
        console.log(error)
    }
}
test()*/

const gestorDeUsuarios = new UserManager();

export default gestorDeUsuarios;

