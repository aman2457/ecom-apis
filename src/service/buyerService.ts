import { CreateOrderRequest } from "../models/orders.dto";
import { sellerRepository } from "../repository/sellerRepository";
import { orderRepository } from "../repository/orderRepository";
import { productRepository } from "../repository/productRepository";
import CommonHttpException from "../exceptions/CommonHttpException";

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
        const getProductsResult = await this.productRepositoryObject.getProducts(sellerId, createOrderRequest.productIds)
        if( getProductsResult.length != createOrderRequest.productIds.length ){
            throw new CommonHttpException(404, `Product id's ${createOrderRequest.productIds} for the given seller id: ${sellerId} not found` )
        }
       
        getProductsResult.forEach( item => {
            return totalAmount = item.price + +totalAmount;
        })

        const result = await this.orderRepositoryObject.createOrder(
            createOrderRequest.productIds,
            sellerId,
            buyerId,
            totalAmount
        )

        if(!result){
            throw new CommonHttpException(500, 'Internal Server Error');
        }

        return result
    }
}
