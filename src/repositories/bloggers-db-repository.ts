import {BloggerType, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";


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


    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    },

    async updateBlogger(id: number, name: string,
                        youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.findOneAndUpdate({id: id},
            {$set: {name, youtubeUrl}})
        return true
    },


    async getCount() {
        return await bloggersCollection.count({})
    },

    async findBlogger(id: number): Promise<boolean> {
        const findBlogger = await bloggersCollection.findOne({id: id})
        return true

    },

    async updateBloggerOne(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id},
            {$set: {name: name, youtubeUrl: youtubeUrl}})
        return result.modifiedCount === 1

    },


    async createPostId(title: string,
                     shortDescription: string,
                     content: string): Promise<PostType | undefined | null> {
        const post = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId: 1,
            bloggerName: "Ann"
        }
        const result = await postsCollection.insertOne(post)
        result.insertedId
        if (result.acknowledged) {
            return {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: post.bloggerName

            }
        }
        return null
    },

    async getCountBloggerId(bloggerId: number) {
        return await postsCollection.count({bloggerId: bloggerId})
    },


    async getBlogger(id: number) {
        const newBlogger = await bloggersCollection.findOne({id: id})
        if (newBlogger) {
            return {
                name: newBlogger.name,
                id: newBlogger.id,
                youtubeUrl: newBlogger.youtubeUrl
            }
        }
    }
}



