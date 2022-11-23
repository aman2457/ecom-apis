import { getConnectedClient } from "../db/DbConnect";
import DatabaseException from "../exceptions/DatabaseException";
import {
  Product,
  ProductRequest,
  ProductResponse,
} from "../models/Catalog.dto";
import { logError } from "../utils/Utils";

export class ProductRepository {
  constructor() {}
  dbClient = getConnectedClient();

  async addProduct(productRequest: ProductRequest, sellerId: any) {
    let id: string = "";
    try {
      const result = await (
        await this.dbClient
      ).query(
        `insert into products(name, price, seller_id) values($1, $2, $3) returning id;`,
        [productRequest.name, productRequest.price, sellerId]
      );
      if (result.rowCount >= 1) {
        id = result.rows[0]?.id;
      }
    } catch (error: any) {
      logError(error.message);
      throw new DatabaseException(500, "Internal Server Error");
    }
    return id;
  }

  async getProducts(
    sellerId: string,
    productIds: string[]
  ): Promise<Product[]> {
    let products: Product[] = [];
    try {
      const result = await (
        await this.dbClient
      ).query(
        `select id, name, price::numeric, seller_id from products where seller_id=$1 and id=any($2)`,
        [sellerId, productIds]
      );
      if (result.rowCount >= 1) {
        result.rows.map((item) => {
          const product: Product = {
            id: item.id,
            name: item.name,
            price: Number(item.price),
            sellerId: item.seller_id,
          };
          products.push(product);
        });
      }
    } catch (error: any) {
      logError(error.message);
      throw new DatabaseException(500, "Internal Server Error");
    }
    return products;
  }
}
