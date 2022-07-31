
import {bloggersDBRepository} from "../repositories/bloggers-db-repository";
import {BloggerType} from "../repositories/types";
import {ObjectId, WithId} from "mongodb";
import bcrypt from "bcrypt";


export const bloggersService = {

    async getBloggersArray(PageNumber: number, PageSize: number): Promise<BloggerType[]> {
        return bloggersDBRepository.getBloggers(PageNumber, PageSize)
    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType | null> {
        return await bloggersDBRepository.createBlogger(name, youtubeUrl)
    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
         return bloggersDBRepository.getBloggerById(id)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        return await  bloggersDBRepository.deleteBlogger(id)
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDBRepository.updateBlogger(id, name, youtubeUrl)

    },

  /*  async createBloggerPass(login: string, email: string, password: string): Promise<BloggerType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newBloggerPass: BloggerType = {
            _id: new ObjectId(),
            bloggerName: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date()
        }
        return bloggersDBRepository.createBloggerPass(newBloggerPass)
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const blogger = await bloggersDBRepository.findByLoginOrEmail(loginOrEmail)
        if (!blogger) return false
        const passwordHash = await this._generateHash(password, blogger.passwordSalt)
        if (blogger.passwordHash !== passwordHash) {
            return false
        }
        return true
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash

    },

 /*   async findByLoginOrEmail(loginOrEmail: string) {
        const blogger = await bloggersDBRepository
            .findByLoginOrEmail({loginOrEmail: loginOrEmail}, { $or [ { email: loginOrEmail },
                { bloggerName: loginOrEmail }]} )
        return blogger
    }*/
}

