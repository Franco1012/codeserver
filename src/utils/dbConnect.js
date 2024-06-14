import { connect } from "mongoose";
import environment from "./env.util.js";

async function dbConnect() {
    try {
        await connect(environment.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;