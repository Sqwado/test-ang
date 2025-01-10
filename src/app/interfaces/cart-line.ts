import { Product, DefaultProduct } from './product';

export interface CartLine {
    product: Product;
    quantity: number;
    lineTotal: number;
}
export class DefaultCartLine implements CartLine {
    product: Product = new DefaultProduct();
    quantity: number = 0;
    lineTotal: number = 0;
}