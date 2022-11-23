import { BuyerService } from "../service/BuyerService";
import HttpStatus from "http-status-codes";
import { NextFunction, Response } from "express";
import { CreateOrderRequest } from "../models/Orders.dto";
import { AuthenticatedUserRequest } from "../models/Authorization.dto";

export class BuyerController {
  constructor() {}

  buyerService = new BuyerService();

  async getSeller(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.buyerService.getSellers();
      res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  async getProductsBySellerId(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.buyerService.getProductsBySellerId(
        req.params.seller_id
      );
      res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  async createOrder(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.buyerService.createOrder(
        req.body as CreateOrderRequest,
        req.params.seller_id,
        req.userId
      );
      res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      next(error);
    }
  }
}
