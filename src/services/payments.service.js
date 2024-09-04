import { createPaymentRepository } from "../repositories/paymentRepository.js"

const createPaymentService = async (user_id) => {
    try {
        const response = await createPaymentRepository(user_id)
        return response
    } catch (error) {
        throw error
    }
}
export { createPaymentService }