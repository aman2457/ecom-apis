import { getConnectedClient } from "../datasource/dbConnect";
import { Product } from "../models/catalog.dto";

export class sellerRepository{

    constructor(){}
    dbClient = getConnectedClient()

    async createCatalog(item: Product) {
        
        throw new Error("Method not implemented.");
    }

}