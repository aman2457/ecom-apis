import express, { NextFunction, Request, Response } from "express";
import { SellerController } from "../controller/SellerController";
import { authorize } from "../middleware/Authorizer.middleware.";
import { AuthenticatedUserRequest, SellerPermissions } from "../models/Authorization.dto";

export const SellerRouter = express.Router();

const sellerController = new SellerController();

SellerRouter.post(
  "/create-catalog",
  authorize(SellerPermissions.WRITE_CATALOG),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    return sellerController.createCatalog(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);

SellerRouter.get(
  "/order",
  authorize(SellerPermissions.READ_ORDERS),
  async (req: Request, res: Response, next: NextFunction) => {
    return sellerController.getOrders(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);
