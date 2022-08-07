import {MongoClient} from "mongodb";
import {BloggerType, PostType} from "./repositories/types";



export const mongoUri = "mongodb+srv://LoraDB:p-fkFTpRiB5r6h6@cluster0.zszv3.mongodb.net/test"

export const settings = {



}
const client = new MongoClient(mongoUri);
const db = client.db("blog")


export const bloggersCollection = db.collection<BloggerType>("bloggers")
export const postsCollection = db.collection<PostType>("posts")

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