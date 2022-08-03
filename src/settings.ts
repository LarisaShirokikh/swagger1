import {MongoClient} from "mongodb";
import {BloggerType, PostType} from "./repositories/types";



export const mongoUri =
    process.env.mongoURI || 'mongodb://0.0.0.0:27017'
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