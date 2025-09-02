import mongoose from "mongoose";
import colors from "colors";
import { exit } from "process";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATEBASE_URL || "");
        console.log(colors.blue.bold(`MongoDB Connected: ${connection.connection.host}`));
    } catch (error) {
        console.error(colors.red.bold(`Error: ${error.message}`));
        exit(1);
    }
}