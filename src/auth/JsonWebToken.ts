import jsonwebtoken from "jsonwebtoken";
import { UserTokenPayload } from "../models/User.dto";
import * as dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = "ECOMAPIS";

export class JsonWebToken {
  constructor() {}

  generateToken(userTokenPayload: UserTokenPayload) {
    return jsonwebtoken.sign(
      userTokenPayload,
      process.env.TOKEN_SECRET_KEY?.toString() ?? SECRET_KEY
    );
  }

  verifyToken(token: string) {
    return jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET_KEY?.toString() ?? SECRET_KEY
    );
  }
}
