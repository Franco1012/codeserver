import { connect } from "mongoose";

async function dbConnect() {
    try {
        await connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;