import {MongoClient} from "mongodb";

const mongoUri =
    process.env.mongoURI || 'mongodb://0.0.0.0:27017'

export let bloggers: BloggerType[]= [
    {
        id: 1,
        name: 'Blogger - 01',
        youtubeUrl: "https://someurl.com",
    },
    {
        id: 2,
        name: 'Blogger - 02',
        youtubeUrl: "https://someurl.com",

    },
    {
        id: 3,
        name: 'Blogger - 03',
        youtubeUrl: "https://someurl.com"
    },
    {
        id: 4,
        name: 'Blogger - 04',
        youtubeUrl: "https://someurl.com",
    },
    {
        id: 5,
        name: 'Blogger - 05',
        youtubeUrl: "https://someurl.com",
    },
]

export type BloggerType  = {
    id: number,
    name: string
    youtubeUrl: string,
}

const client = new MongoClient(mongoUri);
const db = client.db("blog")
export const bloggersCollection = db.collection<BloggerType>("bloggers")

export async function runDb() {
    try {
        await  client.connect();
        await client.db('bloggers').command({ ping: 1});
        console.log("Connected to mongo server");
    } catch {
        console.log("Can't connect to db")
        await client.close();
    }
}