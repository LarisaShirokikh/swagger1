import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination, PostType} from "../repositories/types";
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

    async createPostId(title: string,
                     shortDescription: string,
                     content: string): Promise<PostType | undefined | null> {
        return await bloggersDbRepository.createPostId(title, shortDescription, content)
    },


    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersDbRepository.deleteBlogger(id)
    },


    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBloggerOne(id, name, youtubeUrl)

    },

    async findBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.findBlogger(id)
    },

    async getCountBloggerId(bloggerId: number) {
        return await bloggersDbRepository.getCountBloggerId(bloggerId)
    },

    async getBlogger(id: number): Promise<BloggerType | null | undefined> {
        return await bloggersDbRepository.getBlogger(id)
    }

}

