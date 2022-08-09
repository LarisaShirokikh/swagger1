import {UserDbType} from "../types/types";
import {usersCollection} from "../settings";
import {ObjectId} from "mongodb";

export const usersRepository = {

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