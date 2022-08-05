import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination} from "../repositories/types";
import {postsCollection} from "../settings";


export const bloggersService = {


    async getBloggersArray(PageNumber: number, PageSize: number, SearchNameTerm?: string):
        Promise<Pagination<BloggerType[]>> {

        const items = await bloggersDbRepository.getBloggers(PageNumber, PageSize)
        const totalCount = await bloggersDbRepository.getCount()

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

    async createPost(title: string,
                     shortDescription: string,
                     content: string): Promise<{
        bloggerName: string;
        id: number;
        shortDescription: string;
        title: string;
        content: string;
        bloggerId: string }> {
        return await bloggersDbRepository.createPost(title, shortDescription, content)
    },


    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersDbRepository.deleteBlogger(id)
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBlogger(id, name, youtubeUrl)

    },

    async findBlogger(id: number): Promise<BloggerType | null | undefined> {
        return await bloggersDbRepository.findBlogger(id)
    },

    async getCountBloggerId(bloggerId: number) {
        return await bloggersDbRepository.getCountBloggerId(bloggerId)
    },

}

