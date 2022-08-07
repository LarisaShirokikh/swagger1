import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination, PostType} from "../repositories/types";
import {postsCollection} from "../settings";
import {postDbRepository} from "../repositories/post-db-repository";


export const bloggersService = {


    async getBloggersArray(PageNumber: string = "1" || undefined, PageSize: string = "10" || undefined,
                           SearchNameTerm: string | null = null):
        Promise<Pagination<BloggerType[]>> {
        const bloggers = await bloggersDbRepository.getBloggers(+PageNumber, +PageSize, SearchNameTerm)
        return bloggers

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
            await bloggersDbRepository.createBloggerByPost(newPost)
            return newPost
        }
    },


    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersDbRepository.deleteBlogger(id)
    },


    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBloggerOne(id, name, youtubeUrl)

    },

    async findBlogger(id: number): Promise<boolean> {
        return await bloggersDbRepository.findBlogger(id)
    },

    async getCountBloggerId(bloggerId: number) {
        return await bloggersDbRepository.getCountBloggerId(bloggerId)
    },

    async getBlogger(id: number): Promise<BloggerType | null | undefined> {
        const blogger = await bloggersDbRepository.getBlogger(id)
        return blogger
    },

    async getPostForBlogger(bloggerId: number,
                            PageNumber: string = '1' || undefined || null,
                            PageSize: string = "10" || undefined || null): Promise<Pagination<PostType>> {
        const postsDb = await bloggersDbRepository.getPostForBlogger(bloggerId, +PageNumber, +PageSize);
        return postsDb
    },

}

