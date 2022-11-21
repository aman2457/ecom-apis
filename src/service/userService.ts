import { User, UserLoginRequest } from "../models/user.dto";
import { userRepository } from "../repository/userRepository";
import { errorNames } from "../utils/erroNames";
import { throwError } from "../utils/utils";

export class userService{
    constructor(){}

    userRepositoryObject = new userRepository() 
    async createUser(user: User){
        try {
            const id = await this.userRepositoryObject.createUser(user)
            return id
        } catch (error) {
            console.log(error); 
            throw error
        }
    }
    

    async loginUser(user: UserLoginRequest) {
        const token = await this.userRepositoryObject.loginUser(user)
        return token ?? throwError(errorNames.Unauthorized)
     }
}