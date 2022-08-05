import {BloggerType, PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

export const postsService = {

    async getPostsArray(PageNumber: number, PageSize: number) {
        const items = await postDbRepository.getCount()
        const totalCount = await postDbRepository.getPostCount(PageNumber,PageSize)
        return {
            pagesCount: Math.ceil(totalCount / PageSize),
            page: PageNumber,
            pageSize: PageSize,
            totalCount: totalCount,
            items: items
        }


    },

    async findPost(id: number) {
        return await postDbRepository.findPost(id)
    },

    async findPostById(id: number) {
        return await postDbRepository.findPostById(id)
    },

    async createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
        return await postDbRepository.createPost(title, shortDescription, content, bloggerId)

    },

    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        return await postDbRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },

    async deletePost(id: number) {
        return await postDbRepository.deletePosts(id)
    },



}