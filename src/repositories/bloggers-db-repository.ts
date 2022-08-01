import {BloggerType} from "./types";
import {bloggersCollection} from "../settings";


export const bloggersDbRepository = {

    async getBloggers(PageNumber: number, PageSize: number, term?: string): Promise<number> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}
        }
        const result = await bloggersCollection.find(filter).skip((PageNumber - 1) * PageSize).limit(PageSize)
        return bloggersCollection.countDocuments(filter)

    },

    async getBloggersCount(PageNumber: number, PageSize: number, term?: string): Promise<number> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}
        }
        const result = await bloggersCollection.find(filter).skip((PageNumber - 1) * PageSize).limit(PageSize)
        return bloggersCollection.countDocuments(filter)

    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType | null> {
        const newBlogger = {
            id: +new Date(),
            name,
            youtubeUrl
        }
        const result = await bloggersCollection.insertOne(newBlogger)
        result.insertedId
        if (result.acknowledged) {
            return {
                name: newBlogger.name,
                id: newBlogger.id,
                youtubeUrl: newBlogger.youtubeUrl
            }
        }
        return null

    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
        const gotBlogger = bloggersCollection.findOne({id: id})

        return gotBlogger
    },

    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id}, {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    },


}




