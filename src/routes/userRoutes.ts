import express, { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/UserController";

export const UserRouter = express.Router();

const userController = new UserController();

UserRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    return userController.createUser(req, res, next);
  }
);

UserRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    return userController.loginUser(req, res, next);
  }
);
