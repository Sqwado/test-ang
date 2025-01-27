import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { CartLine } from '../interfaces/cart-line';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = { lines: [], itemCount: 0, cartPrice: 0 };

  addProduct(product: Product): void {
    const line = this.cart.lines.find(l => l.product.id === product.id);
    if (line) {
      line.quantity++;
      line.lineTotal += product.price ?? 0;
    } else {
      this.cart.lines.push({ product, quantity: 1, lineTotal: product.price ?? 0 });
    }
  }

  removeProduct(product: Product): void {
    const index = this.cart.lines.findIndex(l => l.product.id === product.id);
    if (index !== -1) {
      const line = this.cart.lines[index];
      line.quantity--;
      line.lineTotal -= product.price ?? 0;
      if (line.quantity === 0) {
        this.cart.lines.splice(index, 1);
      }
    }
  }

  clearCart(): void {
    this.cart.lines = [];
  }

  getCartLines(): CartLine[] {
    return this.cart.lines;
  }

  getTotalPrice(): number {
    return this.cart.lines.reduce((acc, line) => acc + line.lineTotal, 0);
  }

  getCartItemsCount(): number {
    return this.cart.lines.reduce((acc, line) => acc + line.quantity, 0);
  }

  getLineTotal(line: CartLine): number {
    return (line.product.price ?? 0) * line.quantity;
  }

  trackByCartLineId(index: number, line: CartLine): number {
    return line.product.id;
  }
}
