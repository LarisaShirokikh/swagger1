import {MongoClient} from "mongodb";
import {BloggerType, PostType, UserRegType} from "./types/types";



export const mongoUri = "mongodb+srv://LoraDB:p-fkFTpRiB5r6h6@cluster0.zszv3.mongodb.net/test"

export const settings = {
    MONGO_URI: process.env.mongoURI || "mongodb+srv://LoraDB:p-fkFTpRiB5r6h6@cluster0.zszv3.mongodb.net/test",
    JWT_SECRET: process.env.JWT_SECRET || '123'
}


const client = new MongoClient(mongoUri);
const db = client.db("blog")


export const bloggersCollection = db.collection<BloggerType>("bloggers")
export const postsCollection = db.collection<PostType>("posts")
export const usersCollection = db.collection<UserRegType>("users")



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