import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination, PostType} from "../repositories/types";
import {postsCollection} from "../settings";
import {postDbRepository} from "../repositories/post-db-repository";


export const bloggersService = {


    async getBloggersArray(PageNumber: number, PageSize: number, SearchNameTerm: string):
        Promise<Pagination<BloggerType[]>> {

        const items = await bloggersDbRepository.getBloggers(PageNumber, PageSize, SearchNameTerm)
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

    async createPostByBlogger(bloggerId: number, title: string, shortDescription: string, content: string) {

        const blogger = await bloggersDbRepository.getBloggerByIdForPost(bloggerId)
        if (blogger) {
            const newPost = {
                id: +(new Date()),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: blogger.name
            }
            const newPostForBlogger = await bloggersDbRepository.createBloggerByPost(newPost)
            return newPostForBlogger
        }
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
    },

    async getPostForBlogger(bloggerId: number,
                            PageNumber: string = '1' || undefined || null,
                            PageSize: string = "10" || undefined || null): Promise<Pagination<PostType>> {
        const postsDb = await bloggersDbRepository.getPostForBlogger(bloggerId, +PageNumber, +PageSize);
        return postsDb
    },

}

