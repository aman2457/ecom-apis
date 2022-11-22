import { jsonWebToken } from "../security/jsonWebToken";
import { Request, Response, NextFunction } from 'express'
import { AuthenticatedUserRequest } from "../models/authorization";
import { JwtPayload } from "jsonwebtoken";
import CommonHttpException from "../exceptions/CommonHttpException";
import { logError } from "../utils/utils";

const jsonWebTokenObject = new jsonWebToken()

export function authorize(accessType: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization
            if (authHeader) {
                const token = authHeader.split(" ")[1];
                let user = jsonWebTokenObject.verifyToken(token) as JwtPayload //token signature verifications

                if (!user.permissions.some(((item: string) => item === accessType))) {
                    throw new CommonHttpException(403, `You can not access this endpoint: ${req.url}`)
                } //authorization
                (req as AuthenticatedUserRequest).userId = user.userId;
                (req as AuthenticatedUserRequest).username = user.username;
                (req as AuthenticatedUserRequest).userType = user.userType;
            }
            else {
                throw new CommonHttpException(401, `Unauthorized user`)
            }
            next()
        } catch (error: any) {
            logError(error.message)
            next(error)
        }
    }
}
