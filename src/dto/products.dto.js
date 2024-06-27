import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
    constructor(data) {
        persistence !== "mongo" &&
            (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.photo = data.photo || ["https://www.pilgrim.es/wp-content/uploads/2019/04/ropa-camino-de-santiago-1.jpg"]
        this.category = data.category || ["uncategorized"]
        this.price = data.price || 1;
        this.stock = data.stock || 1;
        persistence !== "mongo" && (this.createdAt = new Date());
        persistence !== "mongo" && (this.updatedAt = new Date());
    }
}

export default ProductsDTO;