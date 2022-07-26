
import {bloggersCollection, BloggersType} from "./db";


export const bloggersInMemoryRepository = {
    async getBloggers() {
        return bloggersCollection
    },

    async createBlogger(newBlogger: BloggersType) {
        const result = await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },

    async getBloggerById(id: BloggersType): Promise<BloggersType> {
        let blogger: BloggersType = await bloggersCollection.insertOne({id})
        return blogger
    },

    async deleteBlogger(id: number) {
        const result = await bloggersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async updateBlogger(id: number, name: string, shortDescription: string,
                              content: string) {
        const result = await bloggersCollection.updateOne({id: id},
            { $set: {name: name}})
        return result.matchedCount === 1

    },

    async findBlogger(name: string | null | undefined): Promise<BloggersType[]> {
        const filter: any = {}

        if (name) {
            filter.name = {$regex: name}
        }
        return bloggersCollection.find(filter).toArray()
    }

}







