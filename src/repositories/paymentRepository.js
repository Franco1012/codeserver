import environment from "../utils/env.util.js";
import dao from "../app/dao.factory.js"
import CheckoutProduct from "../dto/checkoutProduct.dto.js";
import Stripe from "stripe";


const stripe = new Stripe(environment.STRIPE_SECRET);//la variable me permite acceder a los servicios de pago de stripe

const createPaymentRepository = async (user_id) => {
    try {
        const { cartsManager } = dao
        let productsOnCarts = await cartsManager.read({ user_id })
        console.log(productsOnCarts)
        productsOnCarts = productsOnCarts.map((product) => new CheckoutProduct(product))
        console.log(productsOnCarts)

        const line_items = productsOnCarts
        const mode = "payment"
        const success_url = "http://localhost:8080"
        const intent = await stripe.checkout.sessions.create({
            line_items,

            mode,

            success_url


        })


        return intent

    } catch (error) {
        throw error
    }
}

export { createPaymentRepository }