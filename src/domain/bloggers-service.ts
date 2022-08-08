import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination} from "../repositories/types";
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

    async createPostBloggerId(bloggerId: number, title: string, shortDescription: string, content: string) {
        const blogger = await bloggersDbRepository.getBloggerById(bloggerId)
        if (blogger) {
            const newPost = {
                id: +(new Date()),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: blogger.name
            }
            const createdPost = await postDbRepository.createPost(newPost)

            return createdPost
        }
    },

    async getPostsByBloggerId(bloggerId: number, pageNumber: string = '1' || undefined || null, pageSize: string = '10' || undefined || null): Promise<BloggerType | null> {
        const postsDb = await bloggersDbRepository.getPostsByBloggerId(bloggerId, +pageNumber, +pageSize);
        return postsDb



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


    async getBlogger(id: number): Promise<BloggerType | null | undefined> {
        const blogger = await bloggersDbRepository.getBlogger(id)
        return blogger
    },



}

