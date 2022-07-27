import {bloggers, bloggersCollection, BloggerType} from "./db";



export const bloggersInMemoryRepository = {
    async getBloggers(): Promise<BloggerType[]> {
        return bloggersCollection.find().toArray()
    },

    async createBlogger(newBlogger: BloggerType): Promise<BloggerType> {

        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },

    async getBloggerById(blogger: BloggerType): Promise<BloggerType> {
        await bloggersCollection.findOne(blogger)
        return blogger
    },

    async deleteBlogger(blogger: BloggerType): Promise<BloggerType>  {
        await bloggersCollection.deleteOne(blogger)
        return blogger
    },


    async findBlogger(blogger: BloggerType): Promise<BloggerType> {
        await bloggersCollection.findOne(blogger)
        return blogger
    }

}







