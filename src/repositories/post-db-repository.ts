import {PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {bloggersService} from "../domain/bloggers-service";
import {Filter} from "mongodb";
import {postsService} from "../domain/posts-service";


export const postDbRepository = {
    async findPosts(pageSize:number, pageNumber:number) {
        return await postsCollection
            .find({}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
    },
    async findPostById(id: number) {
        return await postsCollection.findOne({id: id})
    },
    async createPost(newPost: PostType) {
        await postsCollection.insertOne(newPost)
        const {id, title, shortDescription, content, bloggerId, bloggerName} = newPost
        return {
            id, title, shortDescription, content, bloggerId, bloggerName
        }
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const result = await postsCollection.updateOne({id: id}, {
            $set: {
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
            }
        })
        return result.matchedCount === 1
    },
    async deletePosts(id: number) {

        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async getCount() {
        return await postsCollection.count({})
    },
    async findBloggersPost(pageSize:number, pageNumber:number, bloggerId: number){
        return await postsCollection.find({bloggerId: bloggerId}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
    },
    async getCountBloggerId(bloggerId: number) {
        return await postsCollection.count({bloggerId: bloggerId})
    },
}
