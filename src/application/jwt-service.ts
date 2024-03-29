import { UsersType} from "../types/types";
import {settings} from "../settings";
import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";

export const jwtService = {

    async createJWT(user: UsersType) {
        const token = jwt
            .sign({userId: user.id},
                settings.JWT_SECRET, {expiresIn: '10h'})
        return token

    },

    async getUserIdByToken (token: string) {
       try {
           const result: any = jwt.decode(token)
           return result.userId
       } catch (error) {
           return null
       }
    }
}