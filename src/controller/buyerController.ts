import { buyerService } from "../service/buyerService";
import HttpStatus from "http-status-codes";
import { NextFunction, Response } from "express";
import { CreateOrderRequest } from "../models/orders.dto";
import { AuthenticatedUserRequest } from "../models/authorization";

export class buyerController {
  constructor() {}

  buyerServiceObject = new buyerService();

  async getSeller(
    req: AuthenticatedUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.buyerServiceObject.getSellers();
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
      const result = await this.buyerServiceObject.getProductsBySellerId(
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
      const result = await this.buyerServiceObject.createOrder(
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
