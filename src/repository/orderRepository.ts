import { it } from "node:test";
import { getConnectedClient } from "../datasource/dbConnect";
import { ProductResponse } from "../models/catalog.dto";
import { Order } from "../models/orders.dto";

export class orderRepository{
    constructor(){}
    dbClient = getConnectedClient()

    async getOrderBySellerId(sellerId: any): Promise<Array<Order<ProductResponse>>>{
        let orders: Array<Order<ProductResponse>> = []
        try {
            const result = await (await this.dbClient).query(
                `select o.id, o.created_at ,
                array_agg( json_build_object('id', p.id, 'name', p."name", 'price', p.price)) as products,
                o.seller_id, o.amount , o.buyer_id
                from orders o 
                   left join products p on p.id = any(o.product_ids)
                where o.seller_id = $1
                   group by o.id;`,
                [ sellerId ]
            )
            
            if(result.rowCount >= 1){
                result.rows.map(
                    item => {
                    const orderObject: Order<ProductResponse> = {
                        id: item.id,
                        products: item.products,
                        sellerId: item.seller_id,
                        buyerId: item.buyer_id,
                        createAt: item.created_at,
                        amount: item.amount
                    }
                    orders.push(orderObject)
                })
            }
        } catch (error) {
            console.log(error); 
            throw error    
        }
        return orders
    }     
}