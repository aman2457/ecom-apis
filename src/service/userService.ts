import { CreateUserRequest, UserLoginRequest, UserTokenPayload } from "../models/user.dto";
import { userRepository } from "../repository/userRepository";
import { jsonWebToken } from "../security/jsonWebToken";
import { verifyPassword } from "../security/utils";
import { errorNames } from "../utils/erroNames";
import { throwError } from "../utils/utils";

export class userService{
    constructor(){}

    userRepositoryObject = new userRepository() 
    jsonWebTokenObject = new jsonWebToken()
    async createUser(user: CreateUserRequest){
        const checkExistingUser = await this.userRepositoryObject.getUser(user.username)
        if (!checkExistingUser){
            const id = await this.userRepositoryObject.createUser(user)
            if(id){
                const payload: UserTokenPayload = {
                    userId: id,
                    username: user.username,
                    type: user.type
                } 
                return this.jsonWebTokenObject.generateToken(payload)
            }
        }
        else{
            throwError(errorNames.AlreadyExists)
        }
    }
    

    async loginUser(user: UserLoginRequest) {
        const getUserResult = await this.userRepositoryObject.getUser(user.username)
        if (getUserResult){
            const isVerifiedPassword = await verifyPassword(user.password, getUserResult.password)
            if(isVerifiedPassword){
                const payload: UserTokenPayload = {
                    userId: getUserResult.userId,
                    username: getUserResult.username,
                    type: getUserResult.type
                } 
                return this.jsonWebTokenObject.generateToken(payload)
            }
            else{
                throwError(errorNames.Unauthorized)
            }
        }else{
            throwError(errorNames.NotFound)
        }
     }
}