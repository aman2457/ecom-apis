import { getConnectedClient } from "../datasource/dbConnect";
import CommonHttpException from "../exceptions/CommonHttpException";
import { CreateUserRequest, User, UserLoginRequest } from "../models/user.dto";
import { logError } from "../utils/utils";

export class userRepository{
    constructor(){}
    dbClient = getConnectedClient()
    
    async createUser(buyer: CreateUserRequest): Promise<string | undefined>{
        let id: string | undefined = undefined
        try {
            const result = await (await this.dbClient).query(
                `insert into users(username, password, user_type) values($1, $2, $3) returning id;`,
                [buyer.username, buyer.password, buyer.type]
            )
            if (result.rowCount == 1){
                id = result.rows[0]?.id
            }            
        }catch (error: any) {
            logError(error.message); 
            throw new CommonHttpException(500, 'Internal Server Error');
        }
        return id
    }

    async loginUser(user: UserLoginRequest) {
        let token: string
        try{
            const result = await (await this.dbClient).query(
                `select id from users where username=$1 and password=$2`,
                [user.username, user.password]
            )

            if (result.rowCount == 1){
                token = 'DummyToken'  //TODO ( figure about token)
                return token
            }
        }
        catch (error: any) {
            logError(error.message); 
            throw new CommonHttpException(500, 'Internal Server Error');
        }
    }

    async getUser(username: string) {
        let user = undefined
        try{
            const result = await (await this.dbClient).query(
                `select * from users where username=$1`,
                [username]
            )
            if (result.rowCount == 1){
                user = {
                    userId: result.rows[0].id,
                    username: result.rows[0].username,
                    password: result.rows[0].password,
                    type: result.rows[0].user_type
                } as User
            }
        }
        catch (error: any) {
            logError(error.message); 
            throw new CommonHttpException(500, 'Internal Server Error');
        }
        return user
    }
}
