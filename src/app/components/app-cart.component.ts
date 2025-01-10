import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  template: `
    <div>
      <div class="cart-header">
        <h2>Cart</h2>
        <button (click)="clearCart()">Clear cart</button>
      </div>
      <p>Items in cart: {{ getCartItemsCount() }}</p>
      <p>Total price: {{ getTotalPrice() | currency: 'EUR' }}</p>
      <ul>
        <ng-container *ngFor="let p of cart; trackBy: trackByCartItemId">
          <li>{{ p.product.name }} - x{{ p.quantity }}</li>
        </ng-container>
      </ul>
    </div>
  `,
  styles: [`
    .cart-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 100%;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 0.5rem 0;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

  `]
})
export class AppCartComponent {
  @Input() cart: { product: Product; quantity: number }[] = [];

  clearCart() {
    this.cart = [];
  }

  getTotalPrice() {
    return this.cart.reduce(
      (acc, item) => acc + (item.product.price || 0) * item.quantity,
      0
    );
  }

  getCartItemsCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  trackByCartItemId(index: number, item: { product: Product; quantity: number }) {
    return item.product.id;
  }
}
