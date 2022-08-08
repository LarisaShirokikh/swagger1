import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination, PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";


const _ = require("lodash");


function omit_Id(obj:any) {
    const result = { ...obj };
    if(obj.items){
        for (let i = 0; i < result.items.length; i++) {
            delete result.items[i]._id
        }
    } else {
        delete result._id
    }
    return result

}


export const bloggersService = {

    async getAllBloggers(pageNumber: string = '1' || undefined, pageSize:string = '10' || undefined, searchNameTerm: string | null = null): Promise<BloggerType | undefined | null> {

        const bloggersDb = await bloggersDbRepository.getAllBloggers(+pageNumber, +pageSize, searchNameTerm)
        // const bloggers = omit_Id(bloggersDb)
        return bloggersDb
    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType> {
        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        const createdBloggerDb = await bloggersDbRepository.createBlogger(newBlogger)
        // const createdBlogger = omit_Id(createdBloggerDb)
        return createdBloggerDb;
    },

    async getBloggerById(bloggerId: number): Promise<BloggerType | null> {
        const bloggerDb = await bloggersDbRepository.getBloggerById(bloggerId);
        // const blogger = omit_Id(bloggerDb)
        return bloggerDb
    },

    async updateBlogger(bloggerId: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBlogger(bloggerId, name, youtubeUrl)
    },

    async deleteBlogger(bloggerId: number): Promise<boolean> {
        return bloggersDbRepository.deleteBlogger(bloggerId)
    },

    async getPostsByBloggerId(bloggerId: number, pageNumber: string = '1' || undefined || null, pageSize: string = '10' || undefined || null): Promise<PostType | null> {
        const postsDb = await bloggersDbRepository.getPostsByBloggerId(bloggerId, +pageNumber, +pageSize);
        // const posts = omit_Id(postsDb)
        return postsDb
    },

    async createPostByBloggerId (bloggerId: number, title: string, shortDescription: string, content: string) {
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
            const createdPostDb = await postDbRepository.createPost(newPost)
            // const createdPost = omit_Id(createdPostDb)
            return createdPostDb
        }
    }
}

