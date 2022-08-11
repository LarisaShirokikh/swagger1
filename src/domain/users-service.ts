import {ObjectId} from "mongodb";
import {UsersType} from "../types/types";
import {usersRepository} from "../repositories/users-repository";

export const usersService = {

    async createUser(
        login: string,
        password: string
    ): Promise<UsersType> {

        let newUser: UsersType = {
            id: (new Date()).toString(),
            login: login,
            password: password

        }

        const createdUser = usersRepository
            .createUser(newUser)
        return createdUser
    },

    async findUserById(id: string): Promise<UsersType | null> {
        return usersRepository.findUserById(id)
    },

    async checkCredentials(login: string, password: string) {
        const user = await usersRepository.findByLogin(login, password)
        if (!user) {
            return
        } else {
            return user
        }
    },


    async getAllUsers(
        pageNumber: string = '1' || undefined,
        pageSize:string = '10' || undefined
    ): Promise<UsersType | undefined | null> {

        const users = await usersRepository.getAllUsersDb(+pageNumber, +pageSize)

        return users
    },

    async deleteUser (id: string
    ): Promise<boolean> {
        return usersRepository.deleteUser(id)
    }
}