import {UserDbType} from "./types";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbType | null
        }
    }
}