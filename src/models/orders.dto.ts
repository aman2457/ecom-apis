import { ProductRequest } from "./catalog.dto"

export interface Order<T>{
    id: string,
    products: Array<T | undefined>,
    sellerId: string,
    buyerId: string,
    createAt: string,
    amount: number
}

export interface CreateOrderRequest{
    productIds: string[]
}