import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {BloggerType, PostType, UserDbType, UsersType} from "../types/types";
import {usersRepository} from "../repositories/users-repository";
import {bloggersDbRepository} from "../repositories/bloggers-db-repository";

export const usersService = {
    async createUser(login: string, email: string, password: string): Promise<UserDbType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserDbType = {
            _id: new ObjectId(),
            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date()
        }
        return usersRepository.createUser(newUser)
    },

    async findUserById(id: ObjectId): Promise<UserDbType | null> {
        return usersRepository.findUserById(id)
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        console.log('hash:  ' + hash)
        return hash
    },

    async getAllUsers(
        pageNumber: string = '1' || undefined,
        pageSize:string = '10' || undefined
    ): Promise<UsersType | undefined | null> {

        const users = await usersRepository.getAllUsersDb(+pageNumber, +pageSize)

        return users
    },
}