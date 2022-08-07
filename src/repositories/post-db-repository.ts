import {BloggerType, Pagination, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";
import {Filter, WithId} from "mongodb";
import {postsService} from "../domain/posts-service";
import {bloggersDbRepository} from "./bloggers-db-repository";


export const postDbRepository = {

    async findPost(id: number) {
        let post = await postsCollection.findOne({id: id})
        if (post) {
            return post
        }
    },


    async getPosts(PageNumber: number, PageSize: number): Promise<PostType[]> {
        let filter = {}
        const test = await postsCollection.find(filter)
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()
        return test.map((b) => ({
            id: b.id,
            title: b.title,
            shortDescription: b.shortDescription,
            content: b.content,
            bloggerId: b.bloggerId,
            bloggerName: b.bloggerName
        }))
    },


    async findPostById(id: number): Promise<PostType | null> {
        const post = await postsCollection.findOne({id: id})
        if (post) {
            return {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: post.bloggerName
            }
        }
        return null
    },
// don't touch!!!!
    async createPost(title: string,
                     shortDescription: string,
                     content: string,
                     bloggerId: number): Promise<PostType | undefined | null> {
        const post = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "Ann"
        }

        const result = await postsCollection.insertOne(post)
        result.insertedId
        if (result.acknowledged) {
            return {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: post.bloggerName

            }
        }
        return null
    },


    async updatePost(id: number,
                     title: string,
                     shortDescription: string,
                     content: string,
                     bloggerId: number): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {
            $set: {
                title,
                shortDescription,
                content,
                bloggerId,
            }
        })
        return result.matchedCount === 1
    },

    async deletePosts(id: number): Promise<boolean> {
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1

    },


    async getCount() {
        return await postsCollection.count({})
    },
    async findBloggersPost(pageSize: number, pageNumber: number, bloggerId: number) {
        return await postsCollection.find({bloggerId: bloggerId}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
    },

}
