import gestorDeCarritos from "../app/mongo/CartManager.mongo.js"
import Service from "./service.js"

const cartsService = new Service(gestorDeCarritos)
const { createService, readService, readOneService,updateService, destroyService } = cartsService
export { createService, readService, readOneService, updateService, destroyService }