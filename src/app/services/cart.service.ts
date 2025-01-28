import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { CartLine } from '../interfaces/cart-line';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = { lines: [], itemCount: 0, cartPrice: 0 };

  addProduct(product: Product, quantity = 1): void {
    const line = this.cart.lines.find(l => l.product.id === product.id);
    if (line) {
      line.quantity += quantity;
      line.lineTotal += (product.price ?? 0) * quantity;
    } else {
      this.cart.lines.push({ product, quantity: quantity, lineTotal: (product.price ?? 0) * quantity });
    }

    // Update the cart price
    this.cart.cartPrice = this.getTotalPrice();

    // Show success toast
  }

  removeProduct(product: Product, quantity = 1): void {
    const index = this.cart.lines.findIndex(l => l.product.id === product.id);
    if (index !== -1) {
      const line = this.cart.lines[index];
      line.quantity -= quantity;
      line.lineTotal -= (product.price ?? 0) * quantity;
      if (line.quantity <= 0) {
        this.cart.lines.splice(index, 1);
      }
    }

    // Update the cart price
    this.cart.cartPrice = this.getTotalPrice();
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
