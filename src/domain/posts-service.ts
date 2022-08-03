import {PostType} from "../repositories/types";
import {postDbRepository} from "../repositories/post-db-repository";

export const postsService = {

    async getPostArray(PageNumber: number, PageSize: number):
        Promise<{
            pagesCount: number;
            pageSize: number;
            page: number;
            totalCount: number;
            items: PostType[] }> {

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

    async createdPost(title: string,
    shortDescription: string,
    content: string,
    bloggerId: number): Promise<PostType> {
        return await postDbRepository.createPost(title,
            shortDescription,
            content,
            bloggerId)
    },

    async getPostById(id: string): Promise<PostType | null | undefined> {
        return postDbRepository.getPostByIdById(id)
    },

    async deletePost(id: number): Promise<boolean> {
        return await postDbRepository.deletePost(id)
    },

    async updatePost(title: string, shortDescription: string,
                     content: string,
                     bloggerId: number): Promise<boolean> {
        return await postDbRepository.updatePost(title,
            shortDescription, content, bloggerId)

    }

}