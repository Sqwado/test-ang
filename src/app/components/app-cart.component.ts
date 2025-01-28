import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { AppCartLineComponent } from './app-cart-line.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FontAwesomeModule, AppCartLineComponent],
  template: `
    <div class="cart">
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button (click)="cartService.clearCart()">
          <fa-icon [icon]="['fas', 'trash-alt']"></fa-icon> Clear cart
        </button>
      </div>
      <div class="cart-body">
        <div class="cart-items">
          <ng-container *ngFor="let p of cartService.cart.lines; trackBy: cartService.trackByCartLineId">
            <app-cart-line [p]="p"></app-cart-line>
          </ng-container>
        </div>
        <div class="cart-summary">
          <p>Items in cart: {{ cartService.getCartItemsCount() }}</p>
          <p>Total price: {{ cartService.getTotalPrice() | currency: 'EUR' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart {
      margin: 1rem 0;
      padding: 1.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: calc(100% - 2rem);
    }

    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      display: flex;
      align-items: center;
    }

    button fa-icon {
      margin-right: 0.5rem;
    }

    button:hover {
      background-color: #0056b3;
    }

    .cart-body {
      display: flex;
      flex-direction: column;
    }

    .cart-items {
      margin-bottom: 1rem;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      margin: 0.5rem 0;
      background-color: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }

    .item-details {
      display: flex;
      flex-direction: column;
    }

    .item-name {
      font-size: 1rem;
      color: #333;
    }

    .item-quantity, .item-price {
      font-size: 0.875rem;
      color: #555;
    }

    .remove-item {
      background: none;
      border: none;
      cursor: pointer;
      color: #d9534f;
    }

    .remove-item fa-icon {
      margin-right: 0;
    }

    .remove-item:hover {
      color: #c9302c;
    }

    .cart-summary {
      margin-top: 1rem;
      font-size: 1rem;
      color: #555;
    }

    @media (max-width: 600px) {
      .cart {
        padding: 1rem;
      }

      .cart-header {
        flex-direction: column;
        align-items: flex-start;
      }

      button {
        margin-top: 1rem;
        width: 100%;
      }

      .cart-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .cart-summary {
        margin-top: 1rem;
      }
    }
  `]
})
export class AppCartComponent {
  cartService = inject(CartService);

  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faMinusCircle);
  }
}
