import express, { NextFunction, Request, Response } from 'express';
import { userController } from '../controller/userController';

export const userRouter = express.Router()

const userControllerObject = new userController()

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    return userControllerObject.createUser(req, res, next)
  })
  
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
return userControllerObject.loginUser(req, res, next)
})
