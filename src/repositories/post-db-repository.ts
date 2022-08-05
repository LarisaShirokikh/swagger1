import {BloggerType, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";
import {Filter, WithId} from "mongodb";
import {postsService} from "../domain/posts-service";


export const postDbRepository = {

    async findPost(id: number) {
        let post = await postsCollection.findOne({id: id})
        if (post) {
            return {
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId
            }
        }
    },


    async getPosts(PageNumber: number, PageSize: number, term?: string | string[]): Promise<PostType[]> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}
        }
        const test = await postsCollection.find(filter)
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()
        return test.map((p) => ({
            id: p.id,
            title: p.title,
            shortDescription: p.shortDescription,
            content: p.content,
            bloggerId: p.bloggerId,
            bloggerName: p.bloggerName
        }))

    },
    async findPosts(pageSize: number, pageNumber: number) {
        return await postsCollection
            .find({}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
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

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
         const result =  await postsCollection.deleteOne({id})
            return result.deletedCount === 1

    },

    async getPostCount(PageNumber: number,
                       PageSize: number,
                       term?: string | string[]): Promise<number> {
        let filter = {}
        if (term) {
            filter = {name: {$regex: term}}
        }
            const test = await bloggersCollection.countDocuments()
            return test

    },

    async getCount() {
        return await postsCollection.count({})
    },
    async findBloggersPost(pageSize: number, pageNumber: number, bloggerId: number) {
        return await postsCollection.find({bloggerId: bloggerId}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
    },
    async getCountBloggerId(bloggerId: number) {
        return await postsCollection.count({bloggerId: bloggerId})
    },
}
