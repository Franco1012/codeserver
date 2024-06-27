class UserManager {
    static #users = [];
    async create(data) {
        try {

            if (data.email && data.password) {

                UserManager.#users.push(data);
                console.log(`usuario creado`)
                return data
            } else {
                const error = new Error("NOT CREATE")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            throw error
        }



    }
    async read(filter) {
        const { role } = filter;
        try {
            let users = [...UserManager.#users]; // Copia del array estático

            // Filtrar por rol si se proporciona
            if (role !== undefined && role !== null && role !== '') {
                users = users.filter(user => user.role === parseInt(role));
            }

            return users;
        } catch (error) {
            console.error("Error al leer usuarios:", error);
            throw error;
        }
    }
    //programar paginate en memory
    async readOne(id) {

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
            throw error

        }

    }
    // Método para encontrar un usuario por email
    async readByEmail(email) {
        try {
            const one = UserManager.#users.find(user => user.email === email);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
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
            throw error

        }
    }
    async destroy(id) {

        try {
            //verificamos si el usuario existe
            const one = this.readOne(id)

            if (one) {

                const within = UserManager.#users.filter(producto => producto.id !== id)
                //cambiamos la referencia de UserManager.#usuarios para que apunte al mismo array que within
                UserManager.#users = within
                console.log("usuario eliminado")
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



}

const gestorDeUsuarios = new UserManager()


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
export default gestorDeUsuarios