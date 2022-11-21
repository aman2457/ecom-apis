export interface CreateCatalogRequest{
    catalog: Array<Product>}

export interface Product{
    name: string,
    price: number
}

export interface ProductResponse{
    id: string
    name: string,
    price: number
}