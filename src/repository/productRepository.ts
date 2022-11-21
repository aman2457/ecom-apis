import { getConnectedClient } from "../datasource/dbConnect";
import { Product, ProductRequest, ProductResponse } from "../models/catalog.dto";

export class productRepository{
    constructor(){}
    dbClient = getConnectedClient()

    async addProduct(productRequest: ProductRequest, sellerId: any){
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

    async getProducts(productIds: string[]): Promise<Product[]>{
        let products: Product[] = []
        try {
            const result = await (await this.dbClient).query(
                `select id, name, price::numeric, seller_id from products where id=any($1)`,
                [productIds]
            )
            if (result.rowCount >= 1){
                result.rows.map( item => {
                const product: Product = {
                    id: item.id,
                    name: item.name,
                    price: Number(item.price),
                    sellerId: item.seller_id
                }
                products.push(product)
            })
            }            
        } catch (error) {
            console.log(error); 
            throw error    
        }
        return products
    }
}