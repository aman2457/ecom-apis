import { User, UserLoginRequest } from "../models/user.dto";
import { userRepository } from "../repository/userRepository";
import { errorNames } from "../utils/erroNames";
import { throwError } from "../utils/utils";

export class userService{
    constructor(){}

    userRepositoryObject = new userRepository() 
    async createUser(user: User){
        const checkExistingUser = await this.userRepositoryObject.getUser(user.username)
        if (!checkExistingUser){
            const id = await this.userRepositoryObject.createUser(user)
            return id
        }
        else{
            throwError(errorNames.AlreadyExists)
        }
    }
    

    async loginUser(user: UserLoginRequest) {
        const token = await this.userRepositoryObject.loginUser(user)
        return token ?? throwError(errorNames.Unauthorized)
     }
}