import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  template: `
    <div class="cart">
      <div class="cart-header">
        <h2>Cart</h2>
        <button (click)="cartService.clearCart()">Clear cart</button>
      </div>
      <p>Items in cart: {{ cartService.getCartItemsCount() }}</p>
      <p>Total price: {{ cartService.getTotalPrice() | currency: 'EUR' }}</p>
      <ul>
        <ng-container *ngFor="let p of cartService.cart.lines; trackBy: cartService.trackByCartLineId">
          <li (click)="cartService.removeProduct(p.product)" style="cursor: pointer">{{ p.product.name }} - x{{ p.quantity }}</li>
        </ng-container>
      </ul>
    </div>
  `,
  styles: [`
    .cart {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

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

    @media (max-width: 600px) {
      .cart-header {
        flex-direction: column;
        align-items: flex-start;
       width:fit-content;
      }

      button {
        margin-top: 1rem;
      }

      ul {
        padding: 0 1rem;
      }

      li {
        margin: 0.5rem 0;
      }
    }
  `]
})
export class AppCartComponent {
  cartService = inject(CartService);
}
