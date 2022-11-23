import { NextFunction, Response } from "express";
import HttpStatus from "http-status-codes";
import { AuthenticatedUserRequest } from "../models/Authorization.dto";
import { CreateCatalogRequest } from "../models/Catalog.dto";
import { DefaultMessage } from "../models/User.dto";
import { SellerService } from "../service/SellerService";

export class SellerController {
  constructor() {}
  
  sellerService = new SellerService();

  async createCatalog(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.sellerService.createCatalog(
        req.body as CreateCatalogRequest,
        req.userId
      );
      const response: DefaultMessage = {
        message: result,
      };
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOrders(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.sellerService.getorders(req.userId);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      next(error);
    }
  }
}
