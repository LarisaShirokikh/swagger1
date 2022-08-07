import {BloggerType, Pagination, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {postDbRepository} from "./post-db-repository";
import {bloggersService} from "../domain/bloggers-service";
import {WithId} from "mongodb";


export const bloggersDbRepository = {


    async getBloggers(PageNumber: number,
                      PageSize: number,
                      SearchNameTerm: string | null): Promise<{ pagesCount: number; pageSize: number; page: number; totalCount: number; items: WithId<BloggerType>[] }> {
        if (SearchNameTerm) {


            const bloggers = await bloggersCollection.find({name: {$regex: SearchNameTerm}})
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()

            const bloggersCount = await bloggersCollection.count({name: {$regex: SearchNameTerm}})
            const pagesCount = Math.ceil(bloggersCount / PageSize)

            const result = {
                pagesCount: pagesCount,
                page: PageNumber,
                pageSize: PageSize,
                totalCount: bloggersCount,
                items: bloggers
            }
            return result

        } else {
            const bloggers = await bloggersCollection.find({}).skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()

            const bloggersCount = await bloggersCollection.count({})
            const pagesCount = Math.ceil(bloggersCount / PageSize)

            const result = {
                pagesCount: pagesCount,
                page: PageNumber,
                PageSize,
                totalCount: bloggersCount,
                items: bloggers
            }
            // @ts-ignore
            return result
        }
    },


    async createBlogger(name: string,
                        youtubeUrl: string
    ): Promise<BloggerType | null> {
        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        const result = await bloggersCollection.insertOne(newBlogger)
        result.insertedId
        if (result.acknowledged) {
            return {
                name: newBlogger.name,
                id: newBlogger.id,
                youtubeUrl: newBlogger.youtubeUrl
            }
        }
        return null

    },


    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id})
        return result.deletedCount === 1
    },


    async findBlogger(id: number): Promise<boolean> {
        const findBlogger = await bloggersCollection.findOne({id: id})
        return true

    },

    async updateBloggerOne(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id},
            {$rename: {name: name, youtubeUrl: youtubeUrl}})
        return result.matchedCount === 1

    },


    async getCountBloggerId(bloggerId: number) {
        const blogger = await bloggersCollection.findOne({bloggerId: bloggerId}, {projection: {_id: 0}})

        if (blogger) {
            return true
        }
        return false

    },


    async getBlogger(id: number) {
        const blogger = await bloggersCollection.findOne({id: id}, {projection: {_id: 0}})
        return blogger

    },

    async createBloggerByPost(newPost: { bloggerName: string;
        id: number; shortDescription: string; title: string; content: string; bloggerId: number }): Promise<PostType> {

        const result = await postsCollection.insertOne(newPost)
        return newPost;
    },

    async getBloggerByIdForPost(bloggerId: number): Promise<BloggerType | null> {
        const blogger: BloggerType | null = await bloggersCollection.findOne({id: bloggerId}, {projection: {_id: 0}})
        return blogger;
    },

        async getPostForBlogger(bloggerId: number,
                                PageNumber: number,
                                PageSize: number): Promise<Pagination<PostType>> {

    const postsCount = await postsCollection.count({bloggerId})
    const pagesCount = Math.ceil(postsCount / PageSize)
    const posts: PostType[] | PostType = await postsCollection.find({bloggerId},
        {projection: {_id: 0}}).skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()

const result = {
    pagesCount: pagesCount,
    page: PageNumber,
    PageSize,
    totalCount: postsCount,
    items: posts
}

// @ts-ignore
return result

},
}



