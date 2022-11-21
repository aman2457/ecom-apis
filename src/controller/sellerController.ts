import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { CreateCatalogRequest } from "../models/catalog.dto";
import { Order } from "../models/orders.dto";
import { DefaultMessage } from "../models/user.dto";
import { sellerService } from "../service/sellerService";

export class sellerController{
    constructor(){}
    sellerServiceObject = new sellerService()
    async createCatalog(req: Request, res: Response){
        try {
            const result = await this.sellerServiceObject.createCatalog(req.body as CreateCatalogRequest)
            const response: DefaultMessage = {
                message: result
            }
            res.status(HttpStatus.OK).json(response)      
        } catch (error) {
            //Todo() Proper error handling
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Something bad has happened.'
            })
        }
    }

    async getOrders(req: Request, res: Response){
        try {
            const result = await this.sellerServiceObject.getorders(req)
            res.status(HttpStatus.OK).json(result)
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Something bad has happened.'
            })
        }
    }
}