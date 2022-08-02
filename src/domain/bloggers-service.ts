import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType} from "../repositories/types";


export const bloggersService = {

    async getBloggersArray(PageNumber: number, PageSize: number):
        Promise<{
        pagesCount: number;
        pageSize: number;
        page: number;
        totalCount: number;
        items: BloggerType[] }> {

        const items = await bloggersDbRepository.getBloggers(PageNumber, PageSize)
        const totalCount = await bloggersDbRepository.getBloggersCount(PageNumber, PageSize)
        return {
            pagesCount: Math.ceil(totalCount / PageSize),
            page: PageNumber,
            pageSize: PageSize,
            totalCount: totalCount,
            items: items
        }
    },

    async createdBlogger(name: string, youtubeUrl: string): Promise<BloggerType | null> {
        return await bloggersDbRepository.createBlogger(name, youtubeUrl)
    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
        return bloggersDbRepository.getBloggerById(id)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersDbRepository.deleteBlogger(id)
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBlogger(id, name, youtubeUrl)

    }

}

