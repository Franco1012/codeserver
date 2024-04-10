class UserManager {
    static #users = [];
    create(data) {
        try {
            //se desestructura el objeto
            const { photo, email, password } = data
            if (email && password) {
                const user = {
                    id: UserManager.#users.lenght === 0 ? 1 : UserManager.#users.length + 1,
                    photo: photo || 'default.jpg',
                    email: email,
                    password: password,
                    role: 0
                }
                UserManager.#users.push(user);
                console.log(`usuario creado`)
            } else {
                const error = new Error("NOT CREATE")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            console.log(error.message)
        }



    }
    read() {
        try {
            if (UserManager.#users.length !== 0) {
                return UserManager.#users
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            console.log(error.message)

        }

    }
    readOne(id) {

        try {
            const one = UserManager.#users.find(usuario => usuario.id === id)
            if (one) {
                return one
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            console.log(error.message)

        }

    }

    destroy(id) {

        try {
            //verificamos si el usuario existe
            const one = this.readOne(id)

            if (one) {

                const within = UserManager.#users.filter(producto => producto.id !== id)
                //cambiamos la referencia de UserManager.#usuarios para que apunte al mismo array que within
                UserManager.#users = within
                console.log("se eliminó el usuario")
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error

            }
        }
        catch (error) {
            console.log(error.message)

        }

    }

    update(id, data) {
        try {

            let users = this.read()
            let user = users.find(u => u.id === id)
            console.log("user", user)

            if (user) {
                for (let prop in data) {
                    user[prop] = data[prop]
                }

                console.log("usuario actualizado")
                return user

            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            console.log(error.message)

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

/*gestorDeUsuarios.create({
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
})*/
gestorDeUsuarios.update(1, { password: "12" })
console.log(gestorDeUsuarios.read())
