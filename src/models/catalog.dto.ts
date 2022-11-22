export interface CreateCatalogRequest{
    catalog: Array<ProductRequest>
}

export interface ProductRequest{
    name: string,
    price: number
}

export interface Product{
    id: string
    name: string,
    price: number,
    sellerId: number
}

export interface ProductResponse{
    id: string
    name: string,
    price: number
}
