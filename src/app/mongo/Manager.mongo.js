class Manager {
    constructor(Model) {
        this.Model = Model;
    }
    async create(data) {
        try {
            const product = await this.Model.create(data)
            return product
        } catch (error) {
            throw error
        }
    }
    async read(filter) {
        try {
            const products = await this.Model.find(filter).lean()
            return products
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            const product = await this.Model.findById(id).lean()
            return product
        } catch (error) {
            throw error
        }
    }
    async update(id, data) {
        try {
            const product = await this.Model.findByIdAndUpdate(id, data, { new: true })//new:true devuelve el objeto actualizado
            return product
        } catch (error) {
            throw error
        }
    }
    async destroy(id) {
        try {
            const product = await this.Model.findByIdAndDelete(id)
            return product
        } catch (error) {
            throw (error)
        }
    }
}

export default Manager;