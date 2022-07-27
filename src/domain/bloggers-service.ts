
import {bloggersInMemoryRepository} from "../repositories/bloggers-db-repository";
import {bloggersCollection, BloggerType} from "../repositories/db";
import {WithId} from "mongodb";


export const bloggersService = {
    async getBloggers() {
        return bloggersInMemoryRepository.getBloggers()
    },

    async createBlogger(id: number, name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
        }

        return bloggersInMemoryRepository.createBlogger(newBlogger)
    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
         return bloggersInMemoryRepository.getBloggerById(id)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        const deleteResult = await  bloggersInMemoryRepository.deleteBlogger(id)
        return !!deleteResult.deletedCount
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const updateResult =  await bloggersInMemoryRepository.updateBlogger(id, name, youtubeUrl)
        return !!updateResult.modifiedCount
    },

    async findBlogger(id: number): Promise<WithId<BloggerType> | null> {
        return bloggersInMemoryRepository.findBlogger(id)
    }

}
