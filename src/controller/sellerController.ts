import { Response } from "express";
import HttpStatus from "http-status-codes";
import { AuthenticatedUserRequest } from "../models/authorization";
import { CreateCatalogRequest } from "../models/catalog.dto";
import { DefaultMessage } from "../models/user.dto";
import { sellerService } from "../service/sellerService";

export class sellerController{
    constructor(){}
    sellerServiceObject = new sellerService()
    async createCatalog(req: AuthenticatedUserRequest, res: Response){
        try {
            const result = await this.sellerServiceObject.createCatalog(req.body as CreateCatalogRequest, req.userId)
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

    async getOrders(req: AuthenticatedUserRequest, res: Response){
        try {
            const result = await this.sellerServiceObject.getorders(req.userId)
            res.status(HttpStatus.OK).json(result)
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Something bad has happened.'
            })
        }
    }
}