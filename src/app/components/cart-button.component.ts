import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cart-button',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <div class="cart-button" [ngClass]="{'active': isActiveRoute('/cart')}">
      <div class="icon-wrapper">
        <fa-icon [icon]="['fas', 'shopping-cart']"></fa-icon>
        <span class="cart-count" *ngIf="cartService.getCartItemsCount() > 0">
          {{ cartService.getCartItemsCount() }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .cart-button {
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 56px;
      height: 56px;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      z-index: 1000;
    }

    .cart-button:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .cart-button.active {
      background-color:rgb(0, 102, 255); /* Couleur subtile d'Amazon */
    }

    .icon-wrapper {
      font-size: 1.6rem;
      color: #333;
    }

    .cart-button.active .icon-wrapper {
      color: #fff;
    }

    .cart-count {
      position: absolute;
      top: -2px;
      right: -2px;
      background-color:rgb(48, 48, 48); /* Un rouge vif et subtil */
      color: white;
      border-radius: 50%;
      padding: 4px 6px;
      font-size: 0.75rem;
      font-weight: bold;
      min-width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .cart-button {
        width: 50px;
        height: 50px;
      }

      .icon-wrapper {
        font-size: 1.4rem;
      }

      .cart-count {
        font-size: 0.7rem;
        padding: 3px 5px;
      }
    }

    @media (max-width: 480px) {
      .cart-button {
        width: 44px;
        height: 44px;
        bottom: 12px;
        right: 12px;
      }

      .icon-wrapper {
        font-size: 1.3rem;
      }

      .cart-count {
        font-size: 0.6rem;
        padding: 3px 4px;
      }
    }

  `],
})
export class CartButtonComponent {
  cartService = inject(CartService);
  router = inject(Router);

  constructor(library: FaIconLibrary) {
    library.addIcons(faShoppingCart);
  }

  isActiveRoute(route: string): boolean {
    return this.router.isActive(route, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }
}
