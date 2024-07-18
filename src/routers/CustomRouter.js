import { Router } from "express"
import { verifyToken } from "../utils/token.util.js"
//import gestorDeUsuarios from "../../app/mongo/UserManager.mongo.js"
import usersRepository from "../repositories/users.rep.js"

import winston from "../utils/winston.util.js"

class CustomRouter {
    //para construir y configurar cada instancia del enrutador
    constructor() {
        this.router = Router()
        this.init()
    }
    //para obtener todas las rutas del enrutador definido 
    getRouter() {
        return this.router
    }
    //para inicializar las clases/propiedades heredadas (sub-routers)
    init() { }
    //para manejar las callbacks(de middleware y la final)
    applyCbs(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                //voy a esperar que cada callback se aplique a este objeto con los los parametros params(req,res,next)
                await callback.apply(this, params)
            } catch (error) {
                return params[2](error)
            }
        })
    }
    response = (req, res, next) => {
        res.message200 = (message) => res.json({ statusCode: 200, message });
        res.response200 = (response) => res.json({ statusCode: 200, response });
        res.paginate = (response, info) =>
            res.json({ statusCode: 200, response, info });
        res.message201 = (message) => res.json({ statusCode: 201, message });
        res.response201 = (message, response) => res.json({ statusCode: 201, message, response });

        res.error400 = (message) => {
            const errorMessage = `${req.method} ${req.url} 400 - ${new Date().toLocaleTimeString()}-${message}`;
            winston.ERROR(errorMessage)
            return res.json({ statusCode: 400, message: message });
        }

        res.error401 = () =>
            res.json({ statusCode: 401, message: "Bad auth from poliecies!" });
        res.error401 = (message) =>
            res.json({ statusCode: 401, message });

        res.error403 = () => {
            const errorMessage = `${req.method} ${req.url} 403 - ${new Date().toLocaleTimeString()} - Forbidden from poliecies!`;
            winston.ERROR(errorMessage)
            return res.json({ statusCode: 403, message: "Forbidden from poliecies!" });
        }

        res.error404 = () =>
            res.json({ statusCode: 404, message: "Not found docs" });
        return next();
    };
    policies = (policies) => async (req, res, next) => {
        if (policies.includes("PUBLIC")) return next();
        else {
            let token = req.cookies["token"];//me traigo el token
            if (!token) return res.error401();//error de autenticación
            else {
                try {
                    token = verifyToken(token)//verificamos el token/me devuelve el destokenizado
                    //el rol lo necesitopara autorizaciones 
                    //el email para buscar el usuario y agregar la propiedad user al objeto de req
                    const { role, email, online } = token;
                    if ((policies.includes("USER") && role === 0) || (policies.includes("ADMIN") && role === 1)) {
                        const user = await usersRepository.readByEmailRepository(email);
                        //proteger contraseña del usuario!!!

                        user.online = online //le agregamos la propiedad online al objeto user
                        req.user = user;
                        delete user.password
                        return next();
                    } else return res.error403();

                } catch (error) {
                    return res.error400(error.message);
                }
            }
        }
    };


    //create("/products",isValidAdmin,isTitle,create) 
    create(path, arrayPolicies, ...callbacks) {
        this.router.post(path, this.response, this.policies(arrayPolicies), this.applyCbs(callbacks))
    }
    read(path, arrayPolicies, ...callbacks) {
        this.router.get(path, this.response, this.policies(arrayPolicies), this.applyCbs(callbacks))
    }
    update(path, arrayPolicies, ...callbacks) {
        this.router.put(path, this.response, this.policies(arrayPolicies), this.applyCbs(callbacks))
    }
    destroy(path, arrayPolicies, ...callbacks) {
        this.router.delete(path, this.response, this.policies(arrayPolicies), this.applyCbs(callbacks))
    }
    use(path, ...callbacks) {
        this.router.use(path, this.response, this.applyCbs(callbacks))
    }

}

export default CustomRouter