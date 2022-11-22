import express, { Request, Response } from 'express';
import { userController } from '../controller/userController';

export const userRouter = express.Router()

const userControllerObject = new userController()

userRouter.post('/register', async (req: Request, res: Response) => {
    return userControllerObject.createUser(req, res)
  })
  
userRouter.post('/login', async (req: Request, res: Response) => {
return userControllerObject.loginUser(req, res)
})