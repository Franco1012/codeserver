class UserManager {
    static #usuarios = [];
    create(data) {
        try {
            const user = {
                id: UserManager.#usuarios.lenght === 0 ? 1 : UserManager.#usuarios.length + 1,
                photo: data.photo,
                email: data.email,
                password: data.password,
                role: 0,
            }
            UserManager.#usuarios.push(user);
            console.log(`usuario creado`)
        }
        catch (error) {
            console.log(error)
        }


    }
    read() {
        try {
            if (UserManager.#usuarios.length !== 0) {
                return UserManager.#usuarios
            } else {
                throw new Error(`No hay usuarios para leer`)
            }

        }
        catch (error) {
            console.log(`Ocurrió un error: ${error.message}`)
        }

    }
    readOne(id) {

        try {
            const one = UserManager.#usuarios.find(usuario => usuario.id === id)
            if (one) {
                return one
            } else {
                throw new Error(`No se encontró el usuario`)
            }
        }


        catch (error) {
            console.log(`hubo un error: ${error}`)
        }

    }

    destroy(id) {

        try {
            //verificamos si el usuario existe
            const one = this.readOne(id)

            if (one) {

                const within = UserManager.#usuarios.filter(producto => producto.id !== id)
                //cambiamos la referencia de UserManager.#usuarios para que apunte al mismo array que within
                UserManager.#usuarios = within
                console.log("se eliminó el usuario")
            } else {
                throw new Error("one no esta definido")
            }


        }
        catch (error) {
            console.log(`se generó un error: ${error.message}`)
        }

    }
}

const gestorDeUsuarios = new UserManager()

gestorDeUsuarios.create({
    photo: `franco.jpg`,
    email: 'soler_franco@hotmail.com',
    password: 'franco1234'
})
//crear otro usuario

gestorDeUsuarios.create({
    photo: 'ana.jpg',
    email: 'kocian_ana@hotmail.com',
    password: 'Ana1234'
})
gestorDeUsuarios.create({
    photo: `Matilda.jpg`,
    email: 'soler_Matilda@hotmail.com',
    password: 'franco1234'
})
//crear otro usuario

gestorDeUsuarios.create({
    photo: 'Pedro.jpg',
    email: 'Pedro@hotmail.com',
    password: 'Ana1234'
})
console.log(gestorDeUsuarios.read())