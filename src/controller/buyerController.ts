import { buyerService } from "../service/buyerService";
import HttpStatus from "http-status-codes";
import { Response } from "express";
import { CreateOrderRequest } from "../models/orders.dto";
import { AuthenticatedUserRequest } from "../models/authorization";
import { errorNames } from "../utils/erroNames";

export class buyerController {
    constructor() { }

    buyerServiceObject = new buyerService()

    async getSeller(req: AuthenticatedUserRequest, res: Response) {
        const result = await this.buyerServiceObject.getSellers()
        res.status(HttpStatus.OK).json(result)
    }

    async getProductsBySellerId(req: AuthenticatedUserRequest, res: Response) {
        const result = await this.buyerServiceObject.getProductsBySellerId(req.params.seller_id)
        res.status(HttpStatus.OK).json(result)
    }

    async createOrder(req: AuthenticatedUserRequest, res: Response) {
        try {
            const result = await this.buyerServiceObject.createOrder(
                req.body as CreateOrderRequest,
                req.params.seller_id,
                req.userId
            )

            res.status(HttpStatus.OK).json(result)
        } catch (error: any) {
            if (error.name == errorNames.InvalidCreate) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: `Invalid product id's for the given seller id` })
            }
            else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Something bad has happened.'
                })
            }
        }

    }
}
