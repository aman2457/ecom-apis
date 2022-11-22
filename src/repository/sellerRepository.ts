import { getConnectedClient } from "../datasource/dbConnect";
import CommonHttpException from "../exceptions/CommonHttpException";
import { Product, ProductRequest } from "../models/catalog.dto";
import { logError } from "../utils/utils";

export class sellerRepository{

    constructor(){}
    dbClient = getConnectedClient()

    async getSellers() {
        try {
            const result = (await this.dbClient).query(
                `select id from users where user_type='SELLER';`
            )
            return (await result).rows
        } catch (error: any) {
            logError(error.message); 
            throw new CommonHttpException(500, 'Internal Server Error');
        }
    }

    async getProductBySellerId(sellerId: string){
        let products: Product[] = []
        try {
            const result = await (await this.dbClient).query(
                `select * from products p where p.seller_id = $1;`,
                [sellerId]
            )
            if( result.rowCount >= 1){
                result.rows.map( item => {
                    const product: Product = {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        sellerId: item.seller_id
                    }
                    products.push(product)
                })
            }
        }catch (error: any) {
            logError(error.message); 
            throw new CommonHttpException(500, 'Internal Server Error');
        }
        return products
    }

}
