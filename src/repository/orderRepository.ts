import { getConnectedClient } from "../db/dbConnect";
import CommonHttpException from "../exceptions/CommonHttpException";
import { ProductResponse } from "../models/catalog.dto";
import { Order } from "../models/orders.dto";
import { logError } from "../utils/utils";

export class orderRepository {
  constructor() {}
  dbClient = getConnectedClient();

  async getOrderBySellerId(
    sellerId: any
  ): Promise<Array<Order<ProductResponse>>> {
    let orders: Array<Order<ProductResponse>> = [];
    try {
      const result = await (
        await this.dbClient
      ).query(
        `select o.id, o.created_at ,
                array_agg( json_build_object('id', p.id, 'name', p."name", 'price', p.price)) as products,
                o.seller_id, o.amount , o.buyer_id
                from orders o 
                   left join products p on p.id = any(o.product_ids)
                where o.seller_id = $1
                   group by o.id;`,
        [sellerId]
      );
      if (result.rowCount >= 1) {
        result.rows.map((item) => {
          const orderObject: Order<ProductResponse> = {
            id: item.id,
            products: item.products,
            sellerId: item.seller_id,
            buyerId: item.buyer_id,
            createAt: item.created_at,
            amount: item.amount,
          };
          orders.push(orderObject);
        });
      }
    } catch (error: any) {
      logError(error.message);
      throw new CommonHttpException(500, "Internal Server Error");
    }
    return orders;
  }

  async createOrder(
    productIds: string[],
    sellerId: string,
    buyerId: string,
    amount: number
  ) {
    let product: Order<string> | undefined = undefined;
    try {
      const result = await (
        await this.dbClient
      ).query(
        `insert into orders(product_ids, seller_id, buyer_id, amount) 
                values(
                    $1::uuid[], 
                    $2, 
                    $3,
                    $4 
                    ) returning *`,
        [productIds, sellerId, buyerId, amount]
      );
      if (result.rowCount == 1) {
        product = {
          id: result.rows[0].id,
          products: result.rows[0].product_ids,
          sellerId: result.rows[0].seller_id,
          buyerId: result.rows[0].buyer_id,
          createAt: result.rows[0].created_at,
          amount: result.rows[0].amount,
        };
      }
    } catch (error: any) {
      logError(error.message);
      throw new CommonHttpException(500, "Internal Server Error");
    }
    return product;
  }
}
