import { MongoClient } from "mongodb";
import { env } from "../config/config.service.js";
export const dbConnection = async () => {
    try {
        const url = env.uri
        const client = new MongoClient(url)
        console.log("database connected successfully");
        return client
    } catch (error) {
        console.log(error);
    }
}




