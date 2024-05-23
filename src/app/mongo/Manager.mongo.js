class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read({ filter }) {
    try {
      //console.log("categoria llega bien", filter)
      const all = await this.Model.find(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }

  async paginate({ filter, opts }) {
    // console.log(opts)
    try {
      const all = await this.Model.paginate(filter, opts);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.Model.findById(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      //console.log("email llega bien", email)
      const one = await this.Model.findOne({ email });
      //console.log(one)
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, { new: true }); //new:true devuelve el objeto actualizado
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async aggregate(obj) {
    try {
      const result = await this.Model.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }
}


export default Manager;
