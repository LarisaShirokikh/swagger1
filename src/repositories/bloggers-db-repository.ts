
import {bloggers, bloggersCollection, BloggerType} from "./db";
import {DeleteResult, ModifyResult, UpdateResult, WithId} from "mongodb";



export const bloggersInMemoryRepository = {
    async getBloggers(): Promise<BloggerType[]> {
        return bloggersCollection.find().toArray()
    },

    async createBlogger(newBlogger: BloggerType): Promise<BloggerType> {

        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
        return bloggersCollection.findOne({id})
    },

    async deleteBlogger(id: number): Promise<DeleteResult>  {
       return bloggersCollection.deleteOne({ id })
    },


    async findBlogger(id: number): Promise<WithId<BloggerType> | null> {
        return bloggersCollection.findOne({id})
    },

    async updateBlogger(
        id: number,
        name: string,
        youtubeUrl: string,
    ): Promise<UpdateResult> {
        return  bloggersCollection.updateOne(
            { id },
            {
                $set: {
                    name,
                    youtubeUrl
                }
            }
        )
    }

}




