
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";
import {BloggerType} from "../repositories/types";


export const bloggersService = {

    async getBloggersArray(PageNumber: number, PageSize: number, SearchNameTerm: any): Promise<BloggerType[]> {
        return bloggersDbRepository.getBloggers(PageNumber, PageSize, SearchNameTerm)
    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerType | null> {
        return await bloggersDbRepository.createBlogger(name, youtubeUrl)
    },

    async getBloggerById(id: number): Promise<BloggerType | null> {
         return bloggersDbRepository.getBloggerById(id)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        return await  bloggersDbRepository.deleteBlogger(id)
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersDbRepository.updateBlogger(id, name, youtubeUrl)

    }

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

