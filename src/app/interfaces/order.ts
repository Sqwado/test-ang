import { Product } from './product';

export interface Order {
    id: number;
    name: string;
    address: string;
    items: Product[];
    itemCount: number;
    totalPrice: number;
}

export class DefaultOrder implements Order {
    id: number = 0;
    name: string = '';
    address: string = '';
    items: Product[] = [];
    itemCount: number = 0;
    totalPrice: number = 0;

    constructor(init?: Partial<DefaultOrder>) {
        Object.assign(this, init);
    }
}