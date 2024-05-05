import { Router } from "express";
import gestorDeCarritos from "../../app/mongo/CartManager.mongo.js";
import { Types } from "mongoose";
const ticketsRouter = Router()

ticketsRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        console.log("este es el uid", uid)
        //generar un agregation
        const ticket = await gestorDeCarritos.aggregate([
            //instrucciones
            {
                $match: {
                    user_id: new Types.ObjectId(uid)
                }
            },
            {
                $lookup: {
                    foreignField: "_id",
                    from: "products",
                    localField: "product_id",
                    as: "product_id",
                }
            },

            { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"] } } },
            { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },

            { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
            { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() } },
            { $merge: { into: "bills" } }
        ])
        return res.json({
            statusCode: 200,
            response: ticket
        })
    } catch (error) {
        return next(error)
    }

})

export default ticketsRouter