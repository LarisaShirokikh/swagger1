import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType, Pagination, PostType} from "../types/types";
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

    async getAllBloggers(
        pageNumber: string = '1' || undefined,
        pageSize:string = '10' || undefined,
        searchNameTerm: string | null = null
    ): Promise<BloggerType | undefined | null> {

        const bloggersDb = await bloggersDbRepository
            .getAllBloggers(
                +pageNumber,
                +pageSize,
                searchNameTerm
            )

        return bloggersDb
    },

    async createBlogger(
        name: string,
        youtubeUrl: string
    ): Promise<BloggerType> {
        const newBlogger: BloggerType = {
            id: (new Date()).toString(),
            name,
            youtubeUrl
        }
        const createdBloggerDb = await bloggersDbRepository
            .createBlogger(newBlogger)

        return createdBloggerDb;
    },

    async getBloggerById(
        bloggerId: string
    ): Promise<BloggerType | null> {
        const bloggerDb = await bloggersDbRepository
            .getBloggerById(bloggerId);

        return bloggerDb
    },

    async updateBlogger(bloggerId: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBlogger(bloggerId, name, youtubeUrl)
    },

    async deleteBlogger(bloggerId: string): Promise<boolean> {
        return bloggersDbRepository.deleteBlogger(bloggerId)
    },

    async getPostsByBloggerId(
        bloggerId: string,
        pageNumber: string = '1' || undefined || null,
        pageSize: string = '10' || undefined || null
    ): Promise<PostType | null> {
        const postsDb = await bloggersDbRepository
            .getPostsByBloggerId
            (bloggerId, +pageNumber, +pageSize);
        return postsDb
    },

    async createPostByBloggerId (bloggerId: string,
                                 title: string,
                                 shortDescription: string,
                                 content: string) {
        const blogger = await bloggersDbRepository
            .getBloggerById(bloggerId)
        if (blogger) {
            const newPost: PostType = {
                id: (new Date()).toString(),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: blogger.name
            }
            const createdPostDb = await postDbRepository
                .createPost(newPost)
            return createdPostDb
        }
    }
}

