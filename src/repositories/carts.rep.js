import dao from "../app/dao.factory.js";
import CartsDTO from "../dto/carts.dto.js";
const { cartsManager } = dao;
//REPOSITORIO ES LA CAPA QUE LLAMA A DAO (DAO importa la persistencia que corresponda)
//ADEMAS ES LA CAPA ENCARGADA DE TRANSFORMAR LOS OBJETOS CON LOS DTO CORRESPONDIENTES

class CartsRepository {
    constructor(manager) {
        this.model = (manager)
    }
    createRepository = async (data) => {
        try {
            data = new CartsDTO(data)
            const cart = await this.model.create(data)
            return cart
        } catch (error) {
            throw error
        }

    }
    readRepository = async (filter) => {
        try {
            let carts;
            carts = await this.model.read(filter);
            return carts

        } catch (error) {
            throw error
        }
    }
    readOneRepository = async (id) => {
        try {
            const cart = await this.model.readOne(id)
            return cart
        } catch (error) {
            throw error
        }
    }
   /* paginateRepository = async ({ filter, opts }) => {
        try {
            const products = await this.model.paginate({ filter, opts })
            return products
        } catch (error) {
            throw error
        }

    }*/
    updateRepository = async (id, data) => {
        try {

            const cart = await this.model.update(id, data)
            return cart
        } catch (error) {
            throw error
        }
    }
    destroyRepository = async (id) => {
        try {
            const cart = await this.model.destroy(id)
            return cart
        } catch (error) {
            throw (error)
        }

    }

}
const cartsRepository = new CartsRepository(cartsManager);
export default cartsRepository;