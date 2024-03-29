import {MongoClient} from "mongodb";
import {BloggerType, CommentType, PostType, UsersType} from "./types/types";



export const mongoUri = "mongodb+srv://LoraDB:p-fkFTpRiB5r6h6@cluster0.zszv3.mongodb.net/test"

export const settings = {
    MONGO_URI: process.env.mongoURI || "mongodb+srv://LoraDB:p-fkFTpRiB5r6h6@cluster0.zszv3.mongodb.net/test",
    JWT_SECRET: process.env.JWT_SECRET || '123'
}


const client = new MongoClient(mongoUri);
const db = client.db("blog")


export const bloggersCollection = db.collection<BloggerType>("bloggers")
export const postsCollection = db.collection<PostType>("posts")
export const usersCollection = db.collection<UsersType>("users")
export const commentCollection = db.collection<CommentType>("comment")


export async function runDb() {
    try {
        await client.connect();
        await client.db('blog').command({ping: 1});
        console.log("Connected to mongo server");
    } catch {
        console.log("Can't connect to db")
        await client.close();
    }
}