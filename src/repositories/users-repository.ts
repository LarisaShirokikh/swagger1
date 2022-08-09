import {UserRegType} from "../types/types";
import {usersCollection} from "../settings";
import {ObjectId, WithId} from "mongodb";

export const usersRepository = {

    async getAllUsersDb(
        pageNumber: number,
        pageSize: number): Promise<UserRegType | undefined | null> {

    const usersCount = await usersCollection.count({})
    const pagesCount = Math.ceil(usersCount / pageSize)
    const users: UserRegType[] = await usersCollection
        .find({})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .toArray()

const result = {
    pagesCount: pagesCount,
    page: pageNumber,
    pageSize,
    totalCount: usersCount,
    items: users
}
// @ts-ignore
return result
},

    async getAllUsers(): Promise<UserRegType[]> {
        return usersCollection.find().sort('createdAt', -1).toArray()
    },

    async createUser(user: { password: string; id: string; login: string }): Promise<UserRegType> {
        const result = await usersCollection
            .insertOne(user)
        return user
    },

    async findUserById(_id: ObjectId): Promise<UserRegType | null> {
        let product = await usersCollection
            .findOne({_id: _id})
        if (product) {
            return product
        } else {
            return null
        }
    },

    async findByLogin(login: string, password: string) {
        const user = await usersCollection
            .findOne({ login: login, password: password} )
        return user
    },

    async deleteUser (id: string): Promise<boolean> {
        const result = await usersCollection
            .deleteOne({id: id})
        return result.deletedCount === 1
    }
}

