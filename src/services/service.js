
class Service {
    constructor(manager) {
        this.manager = (manager)
    }
    createService = async (data) => {
        try {
            const user = await this.manager.create(data)
            return user
        } catch (error) {
            throw error
        }

    }
    readService = async (filter) => {
        try {
            let users;
            users = await this.manager.read(filter);
            return users

        } catch (error) {
            throw error
        }
    }
    readOneService = async (id) => {
        try {
            const user = await this.manager.readOne(id)
            return user
        } catch (error) {
            throw error
        }
    }
    paginateService = async ({ filter, opts }) => {
        try {
            const products = await this.manager.paginate({ filter, opts })
            return products
        } catch (error) {
            throw error
        }

    }
    updateService = async (id, data) => {
        try {

            const user = await this.manager.update(id, data)
            return user
        } catch (error) {
            throw error
        }
    }
    destroyService = async (id) => {
        try {
            const user = await this.manager.destroy(id)
            return user
        } catch (error) {
            throw (error)
        }

    }

}

export default Service