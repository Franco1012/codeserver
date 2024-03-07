class UserManager {
    static #usuarios = [];
    create(data) {
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
    read(){
        return UserManager.#usuarios
    }
}

const gestorDeUsuarios = new UserManager()

gestorDeUsuarios.create({
    photo:`franco.jpg`,
    email: 'soler_franco@hotmail.com',
    password: 'franco1234'
})
//crear otro usuario

gestorDeUsuarios.create({
    photo:'ana.jpg',
    email: 'kocian_ana@hotmail.com',
    password: 'Ana1234'
})
console.log(gestorDeUsuarios.read())