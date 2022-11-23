import express, { NextFunction, Request, Response } from "express";
import { BuyerController } from "../controller/BuyerController";
import { authorize } from "../middleware/Authorizer.middleware.";
import { AuthenticatedUserRequest, BuyerPermissions } from "../models/Authorization.dto";

export const BuyerRouter = express.Router();

const buyerController = new BuyerController();

BuyerRouter.get(
  "/list-of-sellers",
  authorize(BuyerPermissions.READ_SELLERS),
  async (req: Request, res: Response, next: NextFunction) => {
    return buyerController.getSeller(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);

BuyerRouter.get(
  "/seller-catalog/:seller_id",
  authorize(BuyerPermissions.READ_CATALOG),
  async (req: Request, res: Response, next: NextFunction) => {
    return buyerController.getProductsBySellerId(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);

BuyerRouter.post(
  "/create-order/:seller_id",
  authorize(BuyerPermissions.WRITE_ORDER),
  async (req: Request, res: Response, next: NextFunction) => {
    return buyerController.createOrder(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);
