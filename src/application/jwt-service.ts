
import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";
import {settings} from "../settings";
import {BloggerDBType} from "../repositories/types";




export const jwtService = {
    async createJWT(blogger: boolean) {
        const token = jwt.sign({ bloggerId: blogger._id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },
    async getBloggerIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.bloggerId)
        } catch (error) {
            return null
        }
    }
}