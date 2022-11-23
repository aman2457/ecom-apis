import { UserType } from "./User.dto";
import { Request } from "express";

export interface AuthenticatedUserRequest extends Request {
  userId: string;
  username: string;
  userType: UserType;
}

export enum BuyerPermissions {
  READ_SELLERS = 'readSellers',
  READ_CATALOG = 'readCatalog',
  WRITE_ORDER = 'writeOrder'
}

export enum SellerPermissions {
  READ_ORDERS = 'readOrders',
  WRITE_CATALOG = 'writeCatalog'
}
