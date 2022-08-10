import {BloggerType, UserRegType} from "../types/types";
import {bloggersCollection, usersCollection} from "../settings";
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

    async createUser(newUser: UserRegType): Promise<UserRegType> {
        const result = await usersCollection
            .insertOne(newUser)

        const user = await usersCollection
            .find({login: newUser.login},
                {projection: {_id: 0}})
            .toArray()
        return user[0]
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
    },

    async getUserById(userId: string): Promise<UserRegType | null> {
        const user: UserRegType | null = await usersCollection.findOne({id: userId}, {projection: {_id: 0}})
        return user;
    },
}

