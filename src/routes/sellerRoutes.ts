import express, { Request, Response } from 'express';
import { sellerController } from '../controller/sellerController';
import { authorize } from '../middleware/authorizer';
import { AuthenticatedUserRequest } from '../models/authorization';

export const sellerRouter = express.Router()

const sellerControllerObject = new sellerController()

sellerRouter.post('/create-catalog', authorize('writeCatalog'), async (req: Request, res: Response) => {
    console.log(req.body)
    return sellerControllerObject.createCatalog(req as AuthenticatedUserRequest, res)
})

sellerRouter.get('/order', authorize('readOrders'), async (req: Request, res: Response) => {
    return sellerControllerObject.getOrders(req as AuthenticatedUserRequest, res)
})