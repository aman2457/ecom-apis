import { UserType } from "./user.dto";
import { Request } from 'express'

export interface AuthenticatedUserRequest extends Request {
    userId: string,
    username: string,
    userType: UserType
}