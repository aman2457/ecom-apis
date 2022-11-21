import { getConnectedClient } from "../datasource/dbConnect";
import { Product, ProductResponse } from "../models/catalog.dto";

export class productRepository{
    constructor(){}
    dbClient = getConnectedClient()

    async addProduct(productRequest: Product, sellerId: any){
        let id: string = ''
        try {
            const result = await (await this.dbClient).query(
                `insert into products(name, price, seller_id) values($1, $2, $3) returning id;`,
                [productRequest.name, productRequest.price, sellerId]
            )
            if (result.rowCount >= 1){
                id = result.rows[0]?.id
            }            
        } catch (error) {
            console.log(error); 
            throw error    
        }
        return id
    }
}