//import gestorDeUsuarios from "../app/mongo/UserManager.mongo.js"
//import gestorDeUsuarios from "../app/fs/UserManager.js"
//import gestorDeUsuarios from "../app/memory/UserManager.js"
import Service from "./service.js"
//AHORA NINGUN SERVICIO LLAMA A LA PERSISTENCIA
//LOS SERVICIOS VAN A LLAMAR A EL DAO
//SIEMPRE Y CUANDO NO SE IMPLEMENTE UNA CAPA EXTRA:REPOSITORY
//NO SE CONECTA CON EL PATRON DAO PORQUE INCORPORAMOS LA CAPA REPOSITORIOS
//import dao from "../app/dao.factory.js"
//const { users } = dao
import usersRepository from "../repositories/users.rep.js"
//servicio llama a repositorio
const usersService = new Service(usersRepository)
const { createService, readService, readOneService, updateService, destroyService,readByEmailService } = usersService
export { createService, readService, readOneService, updateService, destroyService,readByEmailService }