import {BloggerType, Pagination, PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";

export const postsService = {

    async getPostsArray(PageNumber: number,
                        PageSize: number): Promise<Pagination<PostType[]>> {
        const items = await postDbRepository.getPosts(PageNumber, PageSize)
        const totalCount = await postDbRepository.getCount()
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