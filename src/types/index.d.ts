import {UserDbType} from "../repositories/types";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbType | null
        }
    }
}