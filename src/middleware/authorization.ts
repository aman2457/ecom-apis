import { jsonWebToken } from "../security/jsonWebToken";
import { Request, Response, NextFunction } from 'express'
import { DefaultMessage } from "../models/user.dto";
import { AuthenticatedUserRequest } from "../models/authorization";
import { JwtPayload } from "jsonwebtoken";

const jsonWebTokenObject = new jsonWebToken()

export function authorize(req: Request, res: Response, next: NextFunction){
    try {
        const authHeader = req.headers.authorization
        if(authHeader){
            const token = authHeader.split(" ")[1];
            let user = jsonWebTokenObject.verifyToken(token) as JwtPayload
            (req as AuthenticatedUserRequest).userId = user.userId;
            (req as AuthenticatedUserRequest).username = user.username;
            (req as AuthenticatedUserRequest).userType = user.userType;
        }
        else{
            res.status(401).json( {message: "Unauthorized user"} as DefaultMessage)
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json( {message: "Unauthorized user"} as DefaultMessage)
    }
}