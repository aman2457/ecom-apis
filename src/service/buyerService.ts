import { CreateOrderRequest } from "../models/orders.dto";
import { sellerRepository } from "../repository/sellerRepository";
import { orderRepository } from "../repository/orderRepository";
import { productRepository } from "../repository/productRepository";

export class buyerService{
    constructor(){}

    sellerRepositoryObject = new sellerRepository()
    orderRepositoryObject = new orderRepository()
    productRepositoryObject = new productRepository()
    async getSellers(){
        return await this.sellerRepositoryObject.getSellers()
    }

    async getProductsBySellerId(sellerId: string) {
        return await this.sellerRepositoryObject.getProductBySellerId(sellerId)
    }

    async createOrder(createOrderRequest: CreateOrderRequest, sellerId: string, buyerId: string) {
        let totalAmount = 0
        const getProductsResult = await this.productRepositoryObject.getProducts(createOrderRequest.productIds)
        getProductsResult.forEach( item => {
            return totalAmount = item.price + +totalAmount;
        })

        const result = await this.orderRepositoryObject.createOrder(
            createOrderRequest.productIds,
            sellerId,
            buyerId,
            totalAmount
        )
        return "Order created."
    }
}