import { Request } from "express";
import {
  CreateCatalogRequest,
  ProductRequest,
} from "../models/Catalog.dto";
import { Order } from "../models/Orders.dto";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductRepository } from "../repository/ProductRepository";

export class SellerService {
  constructor() {}

  productRpository = new ProductRepository();
  orderRepository = new OrderRepository();

  async createCatalog(catalogRequest: CreateCatalogRequest, sellerId: string) {
    const result = catalogRequest.catalog.map(async (item) => {
      await this.productRpository.addProduct(item, sellerId);
    });
    return "Product added successfully..";
  }

  async getorders(sellerId: string): Promise<Array<Order<ProductRequest>>> {
    return await this.orderRepository.getOrderBySellerId(sellerId);
  }
}
