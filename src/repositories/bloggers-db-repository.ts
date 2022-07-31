import {BloggerType} from "./types";
import {bloggersCollection} from "../settings";
import {bloggersRoute} from "../router/bloggers-route";


export const bloggersDbRepository = {

    async getBloggers(PageNumber: number, PageSize: number): Promise<BloggerType[]> {
        return await bloggersCollection.find({}).toArray()

    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType | null> {
        const newBlogger = {
            id: +new Date(),
            name,
            youtubeUrl
        }
        const result = await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
        return bloggersCollection.findOne({id: id})
    },

    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    },

   // async findByLoginOrEmail(login: any, email: any): Promise<boolean> {
     //   return


}




