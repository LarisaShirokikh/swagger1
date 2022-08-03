import {PostType} from "./types";
import {postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";


export const postDbRepository = {

    async getPosts(PageNumber: number,
                   PageSize: number, term?: PostType[]): Promise<PostType[]> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}
        }
        const test = await postsCollection.find(filter)
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()
        return test.map((b) => ({
            id: b.id,
            title: b.title,
            shortDescription: b.shortDescription,
            content: b.content,
            bloggerId: b.bloggerId,

        }))

    },

    async getPostCount(PageNumber: number,
                       PageSize: number,
                       term?: string | string[]): Promise<number> {
        let filter = {}

        const test = await postsCollection.countDocuments()

        return test

    },


    async createPost(title: string,
        shortDescription: string, content: string,
        bloggerId: number,): Promise<PostType> {
        const newPost = {
            id: +new Date(),
            title,
            shortDescription,
            content,
            bloggerId
        }
        const result = await postsCollection.insertOne(newPost)
        result.insertedId
        if (result.acknowledged) {
            return {
                id: newPost.id, title: newPost.title, shortDescription: newPost.shortDescription,
                content: newPost.content,
                bloggerId: newPost.bloggerId,

            }
        }
        return null
    },

    async getPostByIdById(id: string): Promise<PostType> {
        const newPost = await postsCollection.findOne({id: id})
        if (newPost) {
            return {
                id: +new Date(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                bloggerId: newPost.bloggerId,
                bloggerName: newPost.bloggerName
            }
        }
        return null
    },


    async deletePost(id: number): Promise<boolean> {
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1
    },

    async updatePost(title: string,
                     shortDescription: string,
                     content: string,
                     bloggerId: number): Promise<boolean> {
        const result = await postsCollection.updateOne({title: title},
            {$set: {shortDescription, content, bloggerId}})
        return result.matchedCount === 1
    },


}
