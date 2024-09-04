//import gestorDeCarritos from "../app/mongo/CartManager.mongo.js"
import Service from "./service.js"
import cartsRepository from "../repositories/carts.rep.js"


const cartsService = new Service(cartsRepository)
const { createService, readService, readOneService, updateService, destroyService } = cartsService
export { createService, readService, readOneService, updateService, destroyService }