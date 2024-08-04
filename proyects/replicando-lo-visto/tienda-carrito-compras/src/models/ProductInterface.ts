export interface Product {
    id: number;
    title: string;
    thumbnail: string;
    category: string;
    price: number;
    quantity?: number;
}