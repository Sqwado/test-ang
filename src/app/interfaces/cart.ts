import { CartLine } from './cart-line';

export interface Cart {
    lines: CartLine[];
    itemCount: number;
    cartPrice: number;
}

export class DefaultCart implements Cart {
    lines: CartLine[] = [];
    itemCount: number = 0;
    cartPrice: number = 0;
}
