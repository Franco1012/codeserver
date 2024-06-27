
class Service {
    constructor(repository) {
        this.repository = (repository)
    }
    createService = async (data) => {
        try {
            const user = await this.repository.createRepository(data)
            return user
        } catch (error) {
            throw error
        }

    }
    readService = async (filter) => {
        try {
            let users;
            users = await this.repository.readRepository(filter);
            return users

        } catch (error) {
            throw error
        }
    }
    readOneService = async (id) => {
        try {
            const user = await this.repository.readOneRepository(id)
            return user
        } catch (error) {
            throw error
        }
    }
    paginateService = async ({ filter, opts }) => {
        try {
            const products = await this.repository.paginateRepository({ filter, opts })
            return products
        } catch (error) {
            throw error
        }

    }
    updateService = async (id, data) => {
        try {

            const user = await this.repository.updateRepository(id, data)
            return user
        } catch (error) {
            throw error
        }
    }
    destroyService = async (id) => {
        try {
            const user = await this.repository.destroyRepository(id)
            return user
        } catch (error) {
            throw (error)
        }

    }

}

export default Service