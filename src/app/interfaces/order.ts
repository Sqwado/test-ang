import { Cart, DefaultCart } from './cart';

export interface Order {
    id: number;
    name: string;
    address: string;
    date?: Date;
    cart: Cart;
}

export class DefaultOrder implements Order {
    id: number = 0;
    name: string = '';
    address: string = '';
    date: Date = new Date();
    cart: Cart = new DefaultCart();

    constructor(init?: Partial<DefaultOrder>) {
        Object.assign(this, init);
    }
}