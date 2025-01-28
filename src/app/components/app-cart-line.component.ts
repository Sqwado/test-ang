import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faMinusCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CartLine } from '../interfaces/cart-line';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart-line',
    imports: [CommonModule, FontAwesomeModule],
    template: `
        <div class="cart-item" (click)="navigateToProduct(p.product.id)">
            <div class="item-details">
                <span class="item-name">
                    {{ p.product.name }}
                    <fa-icon *ngIf="p.product.isFavorite" [icon]="['fas', 'heart']" class="favorite-icon"></fa-icon>
                </span>
                <span class="item-quantity">x{{ p.quantity }}</span>
                <span class="item-price">{{ p.product.price | currency: 'EUR' }}</span>
                <span class="item-total">Total: {{ p.lineTotal | currency: 'EUR' }}</span>
            </div>
            <button (click)="removeProduct($event, p.product)" class="remove-item">
                <fa-icon [icon]="['fas', 'minus-circle']"></fa-icon>
            </button>
        </div>
    `,
    styles: [`
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
            cursor: pointer;
        }

        .item-details {
            display: flex;
            flex-direction: column;
        }

        .item-name {
            font-size: 1rem;
            color: #333;
            display: flex;
            align-items: center;
        }

        .favorite-icon {
            margin-left: 0.5rem;
            color: #ff0000;
        }

        .item-quantity, .item-price, .item-total {
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
export class AppCartLineComponent {
    @Input() p: CartLine = { product: { id: 0, name: '', price: 0, isFavorite: false }, quantity: 0, lineTotal: 0 };
    cartService = inject(CartService);
    router = inject(Router);

    constructor(library: FaIconLibrary) {
        library.addIcons(faTrashAlt, faMinusCircle, faHeart);
    }

    navigateToProduct(productId: number) {
        this.router.navigate(['/products', productId]);
    }

    removeProduct(event: Event, product: any) {
        event.stopPropagation();
        this.cartService.removeProduct(product);
    }
}
