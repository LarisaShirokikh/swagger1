
import {bloggersInMemoryRepository} from "../repositories/bloggers-db-repository";
import {bloggersCollection, BloggersType} from "../repositories/db";
import {bloggersRoute} from "../router/bloggers-route";




export const bloggersService = {
    async getBloggers() {
        return bloggersCollection
    },

    async createBlogger(name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const createdBlogger =  await bloggersCollection.insertOne(newBlogger)
        return createdBlogger
    },

    async getBloggerById(id: number): Promise<BloggersType | null> {
         return bloggersInMemoryRepository.getBloggerById(id)
    },

    async deleteBlogger(id: number){
        return await bloggersInMemoryRepository.deleteBlogger(id)
    },

    async updateBlogger(id: number, name: string, shortDescription: string,
                        content: string) {
        return await bloggersInMemoryRepository.updateBlogger(id,
            name, shortDescription, content)

    },

    async findBlogger(name: string | null | undefined): Promise<BloggersType[]> {
        return bloggersInMemoryRepository.findBlogger(name)
    }

}
