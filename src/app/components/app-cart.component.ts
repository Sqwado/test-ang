import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { AppCartLineComponent } from './app-cart-line.component';
import { OrderModalComponent } from './app-order-modal.component';
import { OrderService } from '../services/order.service';

@Component({
  imports: [CommonModule, FontAwesomeModule, AppCartLineComponent, ReactiveFormsModule, OrderModalComponent],
  selector: 'app-cart',
  template: `
  <div class="cart">
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <button (click)="cartService.clearCart()" [disabled]="cartService.getCartItemsCount() === 0">
        <fa-icon [icon]="['fas', 'trash-alt']"></fa-icon> Clear cart
      </button>
    </div>
    <div class="cart-body">
      <div class="cart-items">
        <ng-container *ngFor="let p of cartService.cart.lines; trackBy: cartService.trackByCartLineId">
          <app-cart-line [p]="p"></app-cart-line>
        </ng-container>
      </div>
    </div>
    <div class="cart-summary">
      <div class="cart-left">
      <p>Items in cart: {{ cartService.getCartItemsCount() }}</p>
      <p>Total price: {{ cartService.getTotalPrice() | currency: 'EUR' }}</p>
      </div>
      <button (click)="openOrderModal()" [disabled]="cartService.getCartItemsCount() === 0">
        <fa-icon [icon]="['fas', 'minus-circle']"></fa-icon> Order Now
      </button>
    </div>

    <!-- Order Modal Component -->
    <app-order-modal
      #orderModal
      (close)="closeOrderModal()"
      (confirm)="confirmOrder()"
    ></app-order-modal>
  </div>
`,
  styles: [`
    /* Styles pour la modal */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none; /* Modal cachée par défaut */
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal.show {
      display: flex; /* Affiche la modal lorsqu'elle a la classe 'show' */
    }

    .modal-content {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 90%;
      max-width: 500px;
    }

    .modal-header,
    .modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h4 {
      margin: 0;
    }

    .modal-footer button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }

    .modal-footer button:hover {
      background-color: #0056b3;
    }


    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }

    .cart { 
        padding: 2rem;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        width: 100%;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 1rem;
        gap: 1rem;
    }

    h2 {
        margin: 0;
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        flex-grow: 1;
    }

    button {
        padding: 0.75rem 1.5rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 500;
    }

    button fa-icon {
        margin-right: 0.5rem;
        font-size: 1.2rem;
    }

    button:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    .cart-body {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-height: 100%;
      overflow-y: auto; /* Permet de scroller dans les articles si leur nombre dépasse l'écran */
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-summary {
      padding: 1.5rem;
      background-color: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-align: center;
      display: flex;
      justify-content: space-between;

      position: sticky; /* Rend la section sticky */
      bottom: 0; /* Collée au bas de l'écran */
      z-index: 10; /* Assure qu'elle reste visible au-dessus d'autres éléments */
    }

    .cart-summary p {
        margin: 0.5rem 0;
        font-size: 1.2rem;
        color: #333;
    }

    .cart-summary p:last-child {
        font-weight: bold;
        font-size: 1.4rem;
        color: #007bff;
    }

    .cart-left {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 0.5rem;
    }

    /* Full Responsiveness */
    @media (max-width: 1024px) {
        .cart-header {
            flex-wrap: wrap;
            text-align: center;
            justify-content: center;
        }

        h2 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }

        button {
            width: auto;
        }
    }

    @media (max-width: 768px) {
        .cart {
            padding: 1.5rem;
        }

        .cart-header {
            flex-direction: column;
        }

        button {
            width: 100%;
            justify-content: center;
        }

        h2 {
            text-align: center;
        }

        .cart-summary {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        .cart {
            padding: 1rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        button {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
        }

        .cart-summary p {
            font-size: 1rem;
        }

        .cart-items {
            gap: 0.75rem;
        }

        .cart-summary {
            padding: 1rem;
        }
    }

    @media (max-width: 360px) {
        .cart {
            padding: 0.75rem;
        }

        button {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }

        .cart-summary p {
            font-size: 0.9rem;
        }
    }
  `]
})
export class AppCartComponent {
  @ViewChild('orderModal') orderModal!: OrderModalComponent;
  cartService = inject(CartService);

  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faMinusCircle);
  }

  openOrderModal() {
    this.orderModal.open();  // Open the modal using the method in OrderModalComponent
  }

  closeOrderModal() {
    this.orderModal.closeModal();  // Close the modal
  }

  confirmOrder() {
    this.closeOrderModal();
  }
}