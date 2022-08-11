import { UsersType} from "../types/types";
import {settings} from "../settings";
import jwt from 'jsonwebtoken'

export const jwtService = {

    async createJWT(user: UsersType) {
        const token = jwt
            .sign({id: user.id}, settings.JWT_SECRET, {expiresIn: '10h'})
        return token

    },

}