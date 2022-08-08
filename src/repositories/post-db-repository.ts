import {BloggerType, Pagination, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";
import {Filter, WithId} from "mongodb";
import {postsService} from "../domain/posts-service";
import {bloggersDbRepository} from "./bloggers-db-repository";


export const postDbRepository = {
    async getAllPosts(pageNumber: number, pageSize: number): Promise<PostType | undefined | null> {

        const postsCount = await postsCollection.count({})
        const pagesCount = Math.ceil(postsCount / pageSize)
        const posts: PostType[] | PostType = await postsCollection.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()

        const result = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items: posts
        }
        // @ts-ignore
        return result
    },

    async createPost(newPost: PostType): Promise<PostType | undefined> {
        const result = await postsCollection.insertOne(newPost)
        const post = await postsCollection.find({id: newPost.id}, {projection: {_id: 0}}).toArray()
        // @ts-ignore
        return post[0]
    },

    async getPostById(postId: number): Promise<PostType | null> {
        const post = await postsCollection.findOne({id: postId}, {projection: {_id: 0}})
        return post;
    },

    async updatePost(postId: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        const result = await postsCollection.updateOne({id: postId}, {
            $set: {
                title,
                shortDescription,
                content,
                bloggerId
            }
        })
        return result.matchedCount === 1

    },

    async deletePost(postId: number): Promise<boolean> {

        const result = await postsCollection.deleteOne({id: postId})

        return result.deletedCount === 1


    },

    async isPost(postId: number) {

        const post: PostType | null = await postsCollection.findOne({id: postId}, {projection: {_id: 0}})
        return post;

        if (post) {
            return true;
        } else {
            return false;
        }
    }
}
