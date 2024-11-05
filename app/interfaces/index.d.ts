import { Category } from './index.d';
export interface Category {
    id: number;
    name: string;
    description: string;
}

export type Categories = Pick<Category, 'id' | 'name' | 'description'>[]

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

export type Products = Pick<Product, 'id' | 'name' | 'description' | 'image' | 'price'>[]

export interface CartList {
    id: number;
    user_id: number;
    items: CartItem[];

}

export interface CartItem {
    id: number;
    cart_id: number;
    quantity: number;
    product: Product;
}