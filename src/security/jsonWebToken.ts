import jsonwebtoken  from 'jsonwebtoken';
import { UserTokenPayload } from '../models/user.dto';

const SECRET_KEY = "ECOMAPIS"

export class jsonWebToken{
    constructor(){}

    generateToken(userTokenPayload: UserTokenPayload){
        return jsonwebtoken.sign(userTokenPayload, SECRET_KEY)
    }

    verifyToken(token: string) {
        return jsonwebtoken.verify(token, SECRET_KEY)
    }
}