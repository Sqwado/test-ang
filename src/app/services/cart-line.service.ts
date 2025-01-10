import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartLine } from '../interfaces/cart-line';

@Injectable({
    providedIn: 'root'
})
export class CartLineService {
   lines: CartLine[] = [];

    addProduct(product: Product): void {
         const line = this.lines.find(l => l.product.id === product.id);
         if (line) {
              line.quantity++;
              line.lineTotal += product.price ?? 0;
         } else {
              this.lines.push({ product, quantity: 1, lineTotal: product.price ?? 0 });
         }
    }

    removeProduct(product: Product): void {
         const index = this.lines.findIndex(l => l.product.id === product.id);
         if (index !== -1) {
              const line = this.lines[index];
              line.quantity--;
              line.lineTotal -= product.price ?? 0;
              if (line.quantity === 0) {
                   this.lines.splice(index, 1);
              }
         }
    }

    clearCart(): void {
         this.lines = [];
    }

    getCartLines(): CartLine[] {
         return this.lines;
    }

    getTotalPrice(): number {
         return this.lines.reduce((acc, line) => acc + line.lineTotal, 0);
    }

    getCartItemsCount(): number {
         return this.lines.reduce((acc, line) => acc + line.quantity, 0);
    }

    getLineTotal(line: CartLine): number {
         return (line.product.price ?? 0) * line.quantity;
    }

    trackByCartLineId(index: number, line: CartLine): number {
         return line.product.id;
    }

}