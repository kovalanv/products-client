export class Product {
    id: number;
    name: string;
    currentPrice: number;
    lastUpdate: number;
}

export class PaginationResponse { 
    message: string;
    status: string;
    statusCode: number;
}

export class ProductsResponse extends PaginationResponse {    
    data: PaginationResponseData<Product>;
}

export class PaginationResponseData<T> {
    totalPages: number;
    totalElements: number;
    size: number;
    first: boolean;
    last: boolean;
    items: T[];
}