import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {UserRegType} from "../types/types";
import {usersRepository} from "../repositories/users-repository";

export const usersService = {
    async createUser(login: string, password: string): Promise<UserRegType> {

        let newUser: { password: string; id: string; login: string } = {
            id: (new Date()).toString(),

            login: login,
            password: password
        }
        // @ts-ignore
        return usersRepository.createUser(newUser)
    },

    async findUserById(_id: ObjectId): Promise<UserRegType | null> {
        return usersRepository.findUserById(_id)
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
    ): Promise<UserRegType | undefined | null> {

        const users = await usersRepository.getAllUsersDb(+pageNumber, +pageSize)

        return users
    },

    async deleteUser (id: string): Promise<boolean> {
        return usersRepository.deleteUser(id)
    }
}