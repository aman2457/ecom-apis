import express, { NextFunction, Request, Response } from "express";
import { sellerController } from "../controller/sellerController";
import { authorize } from "../middleware/authorizer.middleware.";
import { AuthenticatedUserRequest, SellerPermissions } from "../models/authorization";

export const sellerRouter = express.Router();

const sellerControllerObject = new sellerController();

sellerRouter.post(
  "/create-catalog",
  authorize(SellerPermissions.WRITE_CATALOG),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    return sellerControllerObject.createCatalog(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);

sellerRouter.get(
  "/order",
  authorize(SellerPermissions.READ_ORDERS),
  async (req: Request, res: Response, next: NextFunction) => {
    return sellerControllerObject.getOrders(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);
