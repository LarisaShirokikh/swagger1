import {BloggerType, Pagination, PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";
import {WithId} from "mongodb";

export const postsService = {

    async getPostsArray(PageNumber: number,
                        PageSize: number): Promise<{
        pagesCount: number;
        PageSize: number;
        page: number;
        totalCount: number;
        items: WithId<PostType>[] }> {
        return await postDbRepository.getPosts(PageNumber, PageSize)


    },

    async findPost(id: number) {
        return await postDbRepository.findPost(id)
    },

    async findPostById(postId: number) {
        return await postDbRepository.findPostById(postId)
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