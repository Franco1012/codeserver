import { Schema, Types, model } from "mongoose";

const colecction = "carts"

const cartSchema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
    product_id: { type: Types.ObjectId, ref: "products", required: true, index: true },
    quantity: { type: Number, required: true },
    state: { type: String, enum: ["reserved", "paid", "delivered"], default: "reserved" }

},
    { timestamps: true }
)

cartSchema.pre("find", function () { this.populate("user_id", "email rol -_id") })
cartSchema.pre("find", function () { this.populate("product_id", "title photo price  supplier_id  -_id") })
const Cart = model(colecction, cartSchema);
export default Cart;