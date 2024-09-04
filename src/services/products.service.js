//import gestorDeProductos from "../app/mongo/ProductManager.mongo.js"
import Service from "./service.js"
import productsRepository from "../repositories/products.rep.js"

const productsService = new Service(productsRepository)
const { createService, readService, readOneService, paginateService, updateService, destroyService } = productsService
export { createService, readService, readOneService, paginateService, updateService, destroyService }