import {PostType, UserDbType, UsersType} from "../types/types";
import {usersCollection} from "../settings";
import {ObjectId, WithId} from "mongodb";

export const usersRepository = {

    async getAllUsersDb(
        pageNumber: number,
        pageSize: number): Promise<UsersType | undefined | null> {

    const usersCount = await usersCollection.count({})
    const pagesCount = Math.ceil(usersCount / pageSize)
    const users: WithId<UserDbType>[] = await usersCollection
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

    async getAllUsers(): Promise<UserDbType[]> {
        return usersCollection.find().sort('createdAt', -1).toArray()
    },

    async createUser(user: UserDbType): Promise<UserDbType> {
        const result = await usersCollection.insertOne(user)
        return user
    },

    async findUserById(id: ObjectId): Promise<UserDbType | null> {
        let product = await usersCollection.findOne({_id: id})
        if (product) {
            return product
        } else {
            return null
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({ $or: [{ email: loginOrEmail }, { userName: loginOrEmail } ] } )
        return user
    }
}

export const repositoryDB = {}