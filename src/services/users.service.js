import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js"
import Service from "./service.js"

const usersService = new Service(gestorDeUsuarios)
const { createService, readService, readOneService, updateService, destroyService } = usersService
export { createService, readService, readOneService, updateService, destroyService }