import {BloggerType, Pagination, PostType} from "./types";
import {bloggersCollection, postsCollection} from "../settings";
import {postDbRepository} from "./post-db-repository";
import {bloggersService} from "../domain/bloggers-service";


export const bloggersDbRepository = {


    async getBloggers(PageNumber: number,
                      PageSize: number,
                      SearchNameTerm: string | string[]): Promise<BloggerType[]> {
        let filter = {}
        if (SearchNameTerm) {
            filter = {name: {$regex: SearchNameTerm}}
        }
        const test = await bloggersCollection.find(filter)
            .skip((PageNumber - 1) * PageSize).limit(PageSize).toArray()
        return test.map((b) => ({
            name: b.name,
            id: b.id,
            youtubeUrl: b.youtubeUrl
        }))


    },


    async getBloggersCount(SearchNameTerm: string | string[]): Promise<number> {
        let filter = {}
        if (SearchNameTerm) {
            filter = {name: {$regex: SearchNameTerm}}

        }
        const test = await bloggersCollection.countDocuments(filter)
        return test

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

    async updateBlogger(id: number, name: string,
                        youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.findOneAndUpdate({id: id},
            {$set: {name, youtubeUrl}})
        return true
    },


    async getCount() {
        return await bloggersCollection.count({})
    },

    async findBlogger(id: number): Promise<boolean> {
        const findBlogger = await bloggersCollection.findOne({id: id})
        return true

    },

    async updateBloggerOne(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id},
            {$rename: {name: name, youtubeUrl: youtubeUrl}})
        return result.modifiedCount === 1

    },


    async getCountBloggerId(bloggerId: number) {
        const blogger = await postsCollection.findOne({bloggerId: bloggerId}, {projection: {_id: 0}})
        return blogger
        if (blogger) {
            return true
        }
        return false

    },


    async getBlogger(id: number) {
        const newBlogger = await bloggersCollection.findOne({id: id})
        if (newBlogger) {
            return {
                name: newBlogger.name,
                id: newBlogger.id,
                youtubeUrl: newBlogger.youtubeUrl
            }
        }
    },

    async createBloggerByPost(newBlogger: { bloggerName: string;
        id: number; shortDescription: string; title: string; content: string; bloggerId: number }): Promise<BloggerType> {
        // @ts-ignore
        const result = await bloggersCollection.insertOne(newBlogger)
        const post = await bloggersCollection.find({id: newBlogger.id}, {projection: {_id: 0}}).toArray()
        return post[0];
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



