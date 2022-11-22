import { jsonWebToken } from "../security/jsonWebToken";
import { Request, Response, NextFunction } from 'express'
import { DefaultMessage } from "../models/user.dto";
import { AuthenticatedUserRequest } from "../models/authorization";
import { JwtPayload } from "jsonwebtoken";

const jsonWebTokenObject = new jsonWebToken()

export function authorize(accessType: string){
    return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if(authHeader){
            const token = authHeader.split(" ")[1];
            let user = jsonWebTokenObject.verifyToken(token) as JwtPayload //token signature verifications

            if( !user.permissions.some( ((item: string) => item === accessType))){
                return res.status(403).json( {message: `You can not access this endpoint: ${req.url}`} as DefaultMessage )
            } //authorization
            (req as AuthenticatedUserRequest).userId = user.userId;
            (req as AuthenticatedUserRequest).username = user.username;
            (req as AuthenticatedUserRequest).userType = user.userType;
        }
        else{
            return res.status(401).json( {message: "Unauthorized user"} as DefaultMessage)
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json( {message: "Unauthorized user"} as DefaultMessage)
    }
}
}