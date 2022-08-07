import {BloggerType, Pagination, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";
import {Filter, WithId} from "mongodb";
import {postsService} from "../domain/posts-service";
import {bloggersDbRepository} from "./bloggers-db-repository";


export const postDbRepository = {


    async itsPost(id: number) {
        const post = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
        return post
    },

    async findPost(id: number) {
        let post = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
        if (post) {
            return true
        } else {
            return false
        }
    },


    async getPosts(PageNumber: number, PageSize: number): Promise<{ pagesCount: number; PageSize: number; page: number; totalCount: number; items: WithId<PostType>[] }> {
        const postCount = await postsCollection.count({})
        const pagesCount = Math.ceil(postCount / PageSize)

        const posts = await postsCollection.find({})
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()

        const result = {
            pagesCount: pagesCount,
            page: PageNumber,
            PageSize,
            totalCount: postCount,
            items: posts

        }
        return result
    },


    /* let filter = {}
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
 },*/


    async findPostById(postId: number): Promise<PostType | null> {
        const post = await postsCollection.findOne({postId}, {projection: {_id: 0}})
        return post


    },
// don't touch!!!!
    async createPost(title: string, shortDescription: string, content: string, bloggerId: number): Promise<PostType | undefined | null> {
// @ts-ignore
        const result = await postsCollection.insertOne(title, shortDescription, content, bloggerId)
        const post = await postsCollection.find({bloggerId: bloggerId}, {projection: {_id: 0}}).toArray()
        return post[0]
    },


    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
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

    async deletePosts(postId: number): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: postId})
        return result.deletedCount === 1

    },

}
