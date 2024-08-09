import CustomRouter from "../CustomRouter.js";
import { createPayment } from "../../controllers/payments.controllers.js";


class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER","ADMIN"],createPayment)
    }
}


const paymentRouter = new PaymentRouter
export default paymentRouter.getRouter()