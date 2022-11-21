import { buyerService } from "../service/buyerService";
import HttpStatus from "http-status-codes";
import { Request, Response } from "express";
import { CreateOrderRequest } from "../models/orders.dto";

export class buyerController{
    constructor(){}
    readonly buyerId = '48291552-4394-4ed7-b1ea-4fd4028cafba'

    buyerServiceObject = new buyerService()

    async getSeller(req: Request, res: Response){
        const result =  await this.buyerServiceObject.getSellers()
        res.status(HttpStatus.OK).json(result)
    }

    async getProductsBySellerId(req: Request, res: Response){
        const result = await this.buyerServiceObject.getProductsBySellerId(req.params.seller_id)
        res.status(HttpStatus.OK).json(result)
    }

    async createOrder(req: Request, res: Response) {
        const result = await this.buyerServiceObject.createOrder(
            req.body as CreateOrderRequest, 
            req.params.seller_id,
            this.buyerId)
        res.status(HttpStatus.OK).json(result)
      }
}
