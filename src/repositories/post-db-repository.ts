import {PostType} from "./types";
import {postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";
import {Filter} from "mongodb";
import {postsService} from "../domain/posts-service";


export const postDbRepository = {
    async getPosts(
        PageNumber: number,
        PageSize: number,
        filters?: Partial<PostType>
    ): Promise<{items: PostType[], count: number}> {
        let filter: Filter<PostType> = {}

        if (filters) {
            filters.title && ( filter.title = { $regex: filters.title } )
            filters.bloggerId && (filter.bloggerId = filters.bloggerId)
        }

        const count = await postsCollection.countDocuments(filter)

        const test = await postsCollection
            .find(filter)
            .skip((PageNumber - 1) * PageSize)
            .limit(PageSize)
            .toArray()

        const items = test.map((b) => ({
            id: b.id,
            title: b.title,
            shortDescription: b.shortDescription,
            content: b.content,
            bloggerId: b.bloggerId,
            bloggerName: b.bloggerName
        }))

        return { items, count }
    },


    async createPost(newPost: PostType): Promise<PostType | null> {
        const result = await postsCollection.insertOne(newPost)
        return result.acknowledged ? newPost : null
    },

    async getPostById(id: number): Promise<PostType | null> {
        const newPost = await postsCollection.findOne({id: id})

        if (newPost) {
            return {
                id: newPost.id,
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

    async updatePost({id, content, shortDescription, title}: PostType): Promise<boolean> {
        const result = await postsCollection.updateOne(
            {id},
            {
                $set: {
                    shortDescription,
                    content,
                    title
                }
            }
        )
        return result.modifiedCount === 1
    },


}
