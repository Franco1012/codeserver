import { createPaymentService } from "../services/payments.service.js"

const createPayment = async (req, res, next) => {
    try {
        const response = await createPaymentService(req.user._id)
        return res.response200(response)
    } catch (error) {
        return next(error)
    }
}
export { createPayment }