import {MongoClient} from "mongodb";
import {BloggerType} from "./repositories/types";



export const mongoUri =
    process.env.mongoURI || 'mongodb://0.0.0.0:27017'
export const settings = {

    MONGO_URI: process.env.mongoURI || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || '123'
}
const client = new MongoClient(mongoUri);
const db = client.db("blog")
export const bloggersCollection = db.collection<BloggerType>("bloggers")

export async function runDb() {
    try {
        await client.connect();
        await client.db('bloggers').command({ping: 1});
        console.log("Connected to mongo server");
    } catch {
        console.log("Can't connect to db")
        await client.close();
    }
}