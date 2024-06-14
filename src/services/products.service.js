import gestorDeProductos from "../app/mongo/ProductManager.mongo.js"
import Service from "./service.js"

const productsService = new Service(gestorDeProductos)
const { createService, readService, readOneService,paginateService, updateService, destroyService } = productsService
export { createService, readService, readOneService,paginateService, updateService, destroyService }