import { UserType } from "./user.dto";
import { Request } from "express";

export interface AuthenticatedUserRequest extends Request {
  userId: string;
  username: string;
  userType: UserType;
}

export interface Permissions {
  permissions: string[];
}

export interface BuyerPermission extends Permissions {}

export interface SellerPermission extends Permissions {}

export const buyerPermission: BuyerPermission = {
  permissions: ["readSellers", "readCatalog", "writeOrder"],
};

export const sellerPermission: SellerPermission = {
  permissions: ["readOrders", "writeCatalog"],
};
