import { Request } from "express"
import { CreateCatalogRequest, Product, ProductResponse } from "../models/catalog.dto"
import { Order } from "../models/orders.dto"
import { orderRepository } from "../repository/orderRepository"
import { productRepository } from "../repository/productRepository"

export class sellerService{
    orderRepository: any
    constructor(){}
    readonly sellerId = '48291552-4394-4ed7-b1ea-4fd4028cafba'
    readonly orderId = '33d3dc8c-be03-41da-a865-4aae0efa6b04'

    productRpositoryObject = new productRepository()
    orderRepositoryObject = new orderRepository()
    async createCatalog(catalogRequest: CreateCatalogRequest){
        const result = catalogRequest.catalog.map( async item => {
            await this.productRpositoryObject.addProduct(item, this.sellerId)
        })     
        return 'Product added successfully..'
    }

    async getorders(req: Request): Promise<Array<Order<Product>>> {
        return await this.orderRepositoryObject.getOrderBySellerId(this.sellerId)
    }


}
