import {PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";

export const postsService = {
    async findPost(pageSize:number, pageNumber:number) {
        return await postDbRepository.findPosts(pageSize, pageNumber )
    },
    async findPostById(id: number) {
        return await postDbRepository.findPostById(id)
    },
    async createPost(newPost: PostType) {
        return await postDbRepository.createPost(newPost)

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