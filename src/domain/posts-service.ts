import {BloggerType, PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

export const postsService = {

    async getPostsArray(PageNumber: number, PageSize: number):
        Promise<{ pagesCount: number;
        pageSize: number; page: number; totalCount: number; items: PostType[] }> {

        const items = await postDbRepository.getPosts(PageNumber, PageSize)
        const totalCount = await postDbRepository.getPostCount(PageNumber, PageSize)
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

    async getCount() {
        return await postDbRepository.getCount()
    },

    async findBloggersPost(pageSize:number, pageNumber:number,bloggerId:number) {
        return await postDbRepository.findBloggersPost(pageSize, pageNumber, bloggerId)
    },
    async getCountBloggerId(bloggerId: number) {
        return await postDbRepository.getCountBloggerId(bloggerId)
    },
}