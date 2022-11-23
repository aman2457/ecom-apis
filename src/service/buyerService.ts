import { CreateOrderRequest } from "../models/Orders.dto";
import { SellerRepository } from "../repository/SellerRepository";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductRepository } from "../repository/ProductRepository";
import CommonHttpException from "../exceptions/CommonHttpException";

export class BuyerService {
  constructor() {}

  sellerRepository = new SellerRepository();
  orderRepository = new OrderRepository();
  productRepository = new ProductRepository();
  async getSellers() {
    return await this.sellerRepository.getSellers();
  }

  async getProductsBySellerId(sellerId: string) {
    return await this.sellerRepository.getProductBySellerId(sellerId);
  }

  async createOrder(
    createOrderRequest: CreateOrderRequest,
    sellerId: string,
    buyerId: string
  ) {
    let totalAmount = 0;
    const getProductsResult = await this.productRepository.getProducts(
      sellerId,
      createOrderRequest.productIds
    );
    if (getProductsResult.length != createOrderRequest.productIds.length) {
      throw new CommonHttpException(
        404,
        `Product id's ${createOrderRequest.productIds} for the given seller id: ${sellerId} not found`
      );
    }

    getProductsResult.forEach((item) => {
      return (totalAmount = item.price + +totalAmount);
    });

    const result = await this.orderRepository.createOrder(
      createOrderRequest.productIds,
      sellerId,
      buyerId,
      totalAmount
    );

    if (!result) {
      throw new CommonHttpException(500, "Internal Server Error");
    }

    return result;
  }
}
