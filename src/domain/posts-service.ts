import {PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

export const postsService = {

    async getPostArray(PageNumber: number, PageSize: number):
        Promise<{ pagesCount: number; pageSize: number; page: number; totalCount: number; items: { items: PostType[]; count: number } }> {

        const items = await postDbRepository.getPosts(PageNumber, PageSize)
        const totalCount = await postDbRepository.getPostsCount(PageNumber, PageSize)

        return {
            pagesCount: Math.ceil(totalCount / PageSize),
            page: PageNumber,
            pageSize: PageSize,
            totalCount: totalCount,
            items: items
        }
    },

    async createPost(newPost: PostType): Promise<PostType | null> {
        return await postDbRepository.createPost(newPost)
    },

    async getPostById(id: number): Promise<PostType | null> {
        return postDbRepository.getPostById(id)
    },

    async deletePost(id: number): Promise<boolean> {
        return await postDbRepository.deletePost(id)
    },

    async updatePost(updatedPost: PostType): Promise<boolean> {
        return await postDbRepository.updatePost(updatedPost)
    }

}