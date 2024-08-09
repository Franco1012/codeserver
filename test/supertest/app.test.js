import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js"
//import usersRepository from "../../src/repositories/users.rep.js";
console.log(environment.PORT)
const requester = supertest(`http://localhost:${environment.PORT}/api`);//va a ser la ruta a la cual vamos a realizar las distintas solicitudes

describe(
    "testeando MATILDA",
    function () {
        this.timeout(30000)
        const user = {
            email: "solerfrancogerman@gmail.com",
            password: "12345",
            //role: 1,
            //verify: true
        }
        const product = {
            title: "Gorra"
        }
        let token = ""
        let productId
        /*it("Debe registrar un usuario", async () => {
            const response = await requester.post("/sessions/register").send(user)
            const { _body } = response
            //console.log(_body)
            expect(_body.statusCode).to.equals(201)
        })*/
        it("Debe iniciar sesión con el usuario registrado", async () => {
            const response = await requester.post("/sessions/login").send(user)
            const { _body, headers } = response
            //console.log(_body)
            //console.log(headers)
            token = headers["set-cookie"][0].split(";")[0];
            console.log(token)
            expect(_body.statusCode).to.equals(200)
        })
        it("Se debe crear un producto por parte del administrador", async () => {
            const response = await requester.post("/products").set('Cookie', token).send(product)
            const { _body } = response
            console.log("creando producto", _body)
            productId = _body.response._id
            console.log("id de producto a eliminar", productId)
            expect(_body.statusCode).to.equals(201)
        })
        it("Se debe actualizar un producto por parte del administrador", async () => {
            const response = await requester.put(`/products/${productId}`).set('Cookie', token).send({ stock: 25 })
            const { _body } = response
            console.log(_body)
            expect(_body.statusCode).to.equals(200)

        })
        it("Se debe leer un producto por parte del administrador/usuario", async () => {
            const response = await requester.get(`/products/${productId}`).set('Cookie', token)
            const { _body } = response
            console.log(_body)
            expect(_body.statusCode).to.equals(200)
        })
        it("Se debe eliminar un producto por parte del administrador", async () => {
            const response = await requester.delete(`/products/${productId}`).set('Cookie', token)
            const { _body } = response
            console.log(_body)
            expect(_body.statusCode).to.equals(200)
        })
        it("Cerrando sesión", async () => {
            const response = await requester.post("/sessions/signout").set('Cookie', token)
            const { _body } = response
            console.log(_body)
            expect(_body.statusCode).to.equals(200)
        })
        /*it("Eliminación de un usuario", async () => {
            const foundUser = await usersRepository.readByEmailRepository(user.email);
            console.log("usuario a eliminar", foundUser);
            const response = await requester.delete(`/users/${foundUser._id}`).set('Cookie', token);
            const { _body } = response;
            console.log(_body);
            expect(_body.statusCode).to.be.equals(200);
        });*/

    }
)
