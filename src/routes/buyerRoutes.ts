import express, { Request, Response } from 'express';
import { buyerController } from "../controller/buyerController"
import { authorize } from "../middleware/authorizer"
import { AuthenticatedUserRequest } from "../models/authorization"


export const buyerRouter = express.Router()

const buyerControllerObject = new buyerController()

buyerRouter.get('/list-of-sellers', authorize('readSellers'), async (req: Request, res: Response) => {
    return buyerControllerObject.getSeller(req as AuthenticatedUserRequest, res)
})

buyerRouter.get('/seller-catalog/:seller_id', authorize('readCatalog'), async (req: Request, res: Response) => {
    return buyerControllerObject.getProductsBySellerId(req as AuthenticatedUserRequest, res)
})

buyerRouter.post('/create-order/:seller_id', authorize('writeOrder'), async (req: Request, res: Response) => {
    return buyerControllerObject. (req as AuthenticatedUserRequest, res)
})