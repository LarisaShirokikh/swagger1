import {BloggerType, Pagination, PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";
import {WithId} from "mongodb";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

// @ts-ignore
export const postsService = {

    async getPostsArray(PageNumber: string = "1" || undefined || null,
                        PageSize: string = "10"): Promise<{}> {
        const postsDb = await postDbRepository.getPosts(+PageNumber, +PageSize)
        // @ts-ignore
        const posts = {...postsDb}
        for (let i = 0; i < posts.items.length; i++) {
            // @ts-ignore
            delete posts.items[i]._id
        }
        return posts
    },

    async findPost(id: number) {
        return await postDbRepository.findPost(id)
    },

    async findPostById(postId: number) {
        return await postDbRepository.findPostById(postId)
    },

    async createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
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

    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        return await postDbRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },

    async deletePost(id: number) {
        return await postDbRepository.deletePosts(id)
    },



}