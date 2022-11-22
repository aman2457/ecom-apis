import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  UserCreatedResponse,
  UserLoggedInResponse,
  UserLoginRequest,
} from "../models/user.dto";
import { userService } from "../service/userService";
import HttpStatus from "http-status-codes";
import { hashedPassword } from "../security/utils";
import CommonHttpException from "../exceptions/CommonHttpException";

export class userController {
  constructor() {}
  userServiceObject = new userService();

  async createUser(req: Request, res: Response, next: NextFunction) {
    const createUserRequest: CreateUserRequest = {
      username: req.body.username,
      password: await hashedPassword(req.body.password),
      type: req.body.type,
    };
    try {
      const result = await this.userServiceObject.createUser(createUserRequest);
      const response: UserLoggedInResponse = {
        token: result || "",
      };
      res.status(HttpStatus.CREATED).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userloginRequest = this.getUsernameAndPassword(
        req
      ) as UserLoginRequest;
      const result = await this.userServiceObject.loginUser(userloginRequest);
      const response: UserLoggedInResponse = {
        token: result ?? "",
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  private getUsernameAndPassword(req: Request) {
    if (req.headers.authorization) {
      const base64Credentials = req.headers.authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "utf8"
      );
      const [username, password] = credentials.split(":");
      return { username, password } as UserLoginRequest;
    } else {
      throw new CommonHttpException(400, `Authorization header not found`);
    }
  }
}
