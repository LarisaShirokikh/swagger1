import {BloggerType, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {EnhancedOmit, InferIdType} from "mongodb";


export const bloggersDbRepository = {


    async getBloggers(PageNumber: number,
                      PageSize: number,
                      term?: string | string[]): Promise<BloggerType[]> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}
        }
        const test = await bloggersCollection.find(filter)
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()
        return test.map((b) => ({
            name: b.name,
            id: b.id,
            youtubeUrl: b.youtubeUrl
        }))

    },

    async getBloggersCount(term?: string | string[]): Promise<number> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}

        }
        const test = await bloggersCollection.countDocuments(filter)
        return test

    },

    async createBlogger(name: string,
                        youtubeUrl: string
    ): Promise<BloggerType | null> {
        const newBlogger = {
            id: +(new Date()),
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

    async getBloggerById(id: number): Promise<number | undefined> {
        const result = await bloggersCollection.findOne({id: id})
        return result?.id
    },

    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    },

    async updateBlogger(id: number, name: string,
                        youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id},
            {$set: {name, youtubeUrl}})
        return result.matchedCount === 1
    },


    async getCount() {
        return await bloggersCollection.countDocuments({name: {}})
    },

    async findBlogger(id: number): Promise<BloggerType | null | undefined> {
        let blogger= await bloggersCollection.findOne({id: id})
        if (blogger) {
            return  {
                id: blogger.id,
                name: blogger.name,
                youtubeUrl: blogger.youtubeUrl
            }
        }
    },




}




