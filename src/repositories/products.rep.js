import dao from "../app/dao.factory.js";
import ProductsDTO from "../dto/products.dto.js";
const { productsManager } = dao;
//REPOSITORIO ES LA CAPA QUE LLAMA A DAO (DAO importa la persistencia que corresponda)
//ADEMAS ES LA CAPA ENCARGADA DE TRANSFORMAR LOS OBJETOS CON LOS DTO CORRESPONDIENTES

class ProductsRepository {
    constructor(manager) {
        this.model = (manager)
    }
    createRepository = async (data) => {
        try {
            data = new ProductsDTO(data)
            const product = await this.model.create(data)
            return product
        } catch (error) {
            throw error
        }

    }
    readRepository = async (filter) => {
        try {
            let products;
            products = await this.model.read(filter);
            return products

        } catch (error) {
            throw error
        }
    }
    readOneRepository = async (id) => {
        try {
            const product = await this.model.readOne(id)
            return product
        } catch (error) {
            throw error
        }
    }
    paginateRepository = async ({ filter, opts }) => {
        try {
            const products = await this.model.paginate({ filter, opts })
            return products
        } catch (error) {
            throw error
        }

    }
    updateRepository = async (id, data) => {
        try {

            const product = await this.model.update(id, data)
            return product
        } catch (error) {
            throw error
        }
    }
    destroyRepository = async (id) => {
        try {
            const product = await this.model.destroy(id)
            return product
        } catch (error) {
            throw (error)
        }

    }

}
const productsRepository = new ProductsRepository(productsManager);
export default productsRepository;