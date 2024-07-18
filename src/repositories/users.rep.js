import dao from "../app/dao.factory.js"
import UsersDTO from "../dto/users.dto.js";
//repository llama a dao
const { usersManager } = dao;

class UsersRepository {
    constructor(manager) {
        this.model = (manager)
    }
    createRepository = async (data) => {
        try {

            data = new UsersDTO(data)

            const user = await this.model.create(data)
            return user
        } catch (error) {
            throw error
        }

    }
    readRepository = async (filter) => {
        try {
            let users;
            users = await this.model.read(filter);
            return users

        } catch (error) {
            throw error
        }
    }
    readOneRepository = async (id) => {
        try {
            const user = await this.model.readOne(id)
            return user
        } catch (error) {
            throw error
        }
    }
    readByEmailRepository = async (email) => {
        try {
            const one = await this.model.readByEmail(email);
            return one;
        } catch (error) {
            throw error;
        }
    };
    /*paginateRepository = async ({ filter, opts }) => {
        try {
            const products = await this.model.paginate({ filter, opts })
            return products
        } catch (error) {
            throw error
        }

    }*/
    updateRepository = async (id, data) => {
        try {
            const user = await this.model.update(id, data)
            return user
        } catch (error) {
            throw error
        }
    }
    destroyRepository = async (id) => {
        try {
            const user = await this.model.destroy(id)
            return user
        } catch (error) {
            throw (error)
        }

    }

}

const usersRepository = new UsersRepository(usersManager);
export default usersRepository;