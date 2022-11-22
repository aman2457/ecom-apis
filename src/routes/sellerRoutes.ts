import express, { NextFunction, Request, Response } from "express";
import { sellerController } from "../controller/sellerController";
import { authorize } from "../middleware/authorizer.middleware.";
import { AuthenticatedUserRequest } from "../models/authorization";

export const sellerRouter = express.Router();

const sellerControllerObject = new sellerController();

sellerRouter.post(
  "/create-catalog",
  authorize("writeCatalog"),
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
  authorize("readOrders"),
  async (req: Request, res: Response, next: NextFunction) => {
    return sellerControllerObject.getOrders(
      req as AuthenticatedUserRequest,
      res,
      next
    );
  }
);
