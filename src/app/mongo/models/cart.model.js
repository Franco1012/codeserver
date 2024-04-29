import { Schema, model } from "mongoose";

const colecction = "carts"

const cartSchema = new Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    state: { type: String, enum: ["reserved", "paid", "delivered"], default: "reserved" }

},
    { timestamps: true }
)
const Cart = model(colecction, cartSchema);
export default Cart;