import e, { Request, Response } from "express";
import { User, UserCreatedResponse, UserLoggedInResponse, UserLoginRequest } from "../models/user.dto";
import { userService } from "../service/userService";
import HttpStatus from "http-status-codes";
import { errorNames } from "../utils/erroNames";
import { throwError } from "../utils/utils";
import { hashedPassword } from "../security/utils";

export class userController{
    constructor(){}
    userServiceObject = new userService() 

    async createUser(req: Request, res: Response){
        const createUserRequest: User = {
            username: req.body.username,
            password: await hashedPassword(req.body.password),
            type: req.body.type
        }
        try {
            const result = (await this.userServiceObject.createUser(createUserRequest))
            const response: UserCreatedResponse = {
                id: result || '' 
            }
            res.status(HttpStatus.CREATED).json(response)      
        } catch (error: any) {
            if(error.name == errorNames.AlreadyExists){
                res.status(HttpStatus.BAD_REQUEST).json({
                    error: 'User already exist'
                })
            }
            else{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Something bad has happened.'
                })    
            }
        }
    }
    
    async loginUser(req: Request, res: Response){ 
        try {
            const userloginRequest = this.getUsernameAndPassword(req) as UserLoginRequest
            const result = (await this.userServiceObject.loginUser(userloginRequest))
            const response: UserLoggedInResponse = {
                token: result ?? ''
            }
            res.status(HttpStatus.OK).json(response)      
        } catch (error: any) {
            if (error.name == errorNames.Unauthorized)
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'user not found'
            })
            if (error.name == errorNames.InvalidRequest)
            res.status(HttpStatus.UNAUTHORIZED).json({
                error: 'Authorization header not found'
            })
            else{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Something bad has happened.'
                })  
            }
        }
    }

    private getUsernameAndPassword(req:Request){
        if(req.headers.authorization) {
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
            const [username, password] = credentials.split(':');
            return {username, password} as UserLoginRequest
          }
          else{
            throwError(errorNames.InvalidRequest)
          }
    }
}