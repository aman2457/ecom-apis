import { Request } from "express";
import {
  CreateCatalogRequest,
  ProductRequest,
  ProductResponse,
} from "../models/catalog.dto";
import { Order } from "../models/orders.dto";
import { orderRepository } from "../repository/orderRepository";
import { productRepository } from "../repository/productRepository";

export class sellerService {
  orderRepository: any;
  constructor() {}

  productRpositoryObject = new productRepository();
  orderRepositoryObject = new orderRepository();

  async createCatalog(catalogRequest: CreateCatalogRequest, sellerId: string) {
    const result = catalogRequest.catalog.map(async (item) => {
      await this.productRpositoryObject.addProduct(item, sellerId);
    });
    return "Product added successfully..";
  }

  async getorders(sellerId: string): Promise<Array<Order<ProductRequest>>> {
    return await this.orderRepositoryObject.getOrderBySellerId(sellerId);
  }
}
