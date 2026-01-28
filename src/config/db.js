import mongoose from "mongoose";
import { env } from "./env.js";

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(env.mongoUri);

        console.log(`Mongoose Connected ${connection.connection.host}`);
    } catch (error) {
        console.log('Error in Mongoose Connection');
        console.log(error.messsage);
        process.exit(1);
    }
}

export default connectDb;