import {bloggers, bloggersCollection, BloggersType} from "./db";



export const bloggersInMemoryRepository = {
    async getBloggers(): Promise<BloggersType[]> {
        return bloggersCollection.find().toArray()
    },

    async createBlogger(newBlogger: BloggersType): Promise<BloggersType> {

        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },

    async getBloggerById(blogger: BloggersType): Promise<BloggersType> {
        await bloggersCollection.findOne(blogger)
        return blogger
    },

    async deleteBlogger(blogger: BloggersType): Promise<BloggersType>  {
        await bloggersCollection.deleteOne(blogger)
        return blogger
    },


    async findBlogger(blogger: BloggersType): Promise<BloggersType> {
        await bloggersCollection.findOne(blogger)
        return blogger
    }

}







