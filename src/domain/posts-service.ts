import {PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";

export const postsService = {

    async getPostArray(PageNumber: number, PageSize: number, filters?: Partial<PostType>):
        Promise<{
            pagesCount: number;
            pageSize: number;
            page: number;
            totalCount: number;
            items: PostType[] }> {

        const {items, count} = await postDbRepository.getPosts(PageNumber, PageSize, filters)

        return {
            pagesCount: Math.ceil(count / PageSize),
            page: PageNumber,
            pageSize: PageSize,
            totalCount: count,
            items
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