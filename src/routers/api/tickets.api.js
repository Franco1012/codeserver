
//import { Router } from "express";
import CustomRouter from "../CustomRouter.js";
//import gestorDeCarritos from "../../app/mongo/CartManager.mongo.js";
import dao from "../../app/dao.factory.js"
const { cartsManager } = dao
import { Types } from "mongoose";

class TicketsRouter extends CustomRouter {
    init() {
        this.read("/", ["USER"], async (req, res, next) => {
            try {
                const { _id } = req.user
                //generar un agregation
                const ticket = await cartsManager.aggregate([
                    //instrucciones
                    {
                        $match: {
                            user_id: new Types.ObjectId(_id)
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
                    { $merge: { into: "tickets" } }
                ])
                return res.json({
                    statusCode: 200,
                    response: ticket
                })
            } catch (error) {
                return next(error)
            }

        })
    }
}

const ticketsRouter = new TicketsRouter()
export default ticketsRouter.getRouter()

