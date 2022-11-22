import { NextFunction, Response } from "express";
import HttpStatus from "http-status-codes";
import { AuthenticatedUserRequest } from "../models/authorization";
import { CreateCatalogRequest } from "../models/catalog.dto";
import { DefaultMessage } from "../models/user.dto";
import { sellerService } from "../service/sellerService";

export class sellerController{
    constructor(){}
    sellerServiceObject = new sellerService()
    async createCatalog(req: AuthenticatedUserRequest, res: Response, next: NextFunction){
        try {
            const result = await this.sellerServiceObject.createCatalog(req.body as CreateCatalogRequest, req.userId)
            const response: DefaultMessage = {
                message: result
            }
            res.status(HttpStatus.OK).json(response)      
        } catch (error) {
            next(error)
        }
    }

    async getOrders(req: AuthenticatedUserRequest, res: Response, next: NextFunction){
        try {
            const result = await this.sellerServiceObject.getorders(req.userId)
            res.status(HttpStatus.OK).json(result)
        } catch (error) {
            next(error)
        }
    }
}
