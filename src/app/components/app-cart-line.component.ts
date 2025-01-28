import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faMinusCircle, faPlusCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
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
                <div class="item-quantity-controls">
                    <button (click)="decreaseQuantity($event, p.product)" class="quantity-control">
                        <fa-icon [icon]="['fas', 'minus-circle']"></fa-icon>
                    </button>
                    <span class="item-quantity">x{{ p.quantity }}</span>
                    <button (click)="increaseQuantity($event, p.product)" class="quantity-control">
                        <fa-icon [icon]="['fas', 'plus-circle']"></fa-icon>
                    </button>
                </div>
                <span class="item-price">{{ p.product.price | currency: 'EUR' }}</span>
                <span class="item-total">Total: {{ p.lineTotal | currency: 'EUR' }}</span>
            </div>
            <button (click)="removeProduct($event, p.product)" class="remove-item">
                <fa-icon [icon]="['fas', 'trash-alt']"></fa-icon>
            </button>
        </div>
    `,
    styles: [`
        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            margin: 0.5rem 0;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
        }
    
        .cart-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
    
        .item-details {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            margin-right: 1rem;
        }
    
        .item-name {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }
    
        .favorite-icon {
            margin-left: 0.5rem;
            color: #e74c3c;
        }
    
        .item-quantity-controls {
            display: flex;
            align-items: center;
            margin-top: 0.5rem;
        }
    
        .quantity-control {
            background: #007bff;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            color: white;
            font-size: 1.4rem;
            width: 36px;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
    
        .quantity-control:hover {
            background: #0056b3;
            transform: scale(1.1);
        }
    
        .item-quantity {
            margin: 0 1rem;
            font-size: 1.1rem;
            color: #555;
        }
    
        .item-price, .item-total {
            font-size: 1rem;
            color: #333;
            margin-top: 0.5rem;
            font-weight: 500;
        }
    
        .remove-item {
            background: #d9534f;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            color: white;
            font-size: 1rem;
            padding: 0.5rem 1rem;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
    
        .remove-item:hover {
            background: #c9302c;
            transform: scale(1.05);
        }
    
        @media (max-width: 600px) {
            .cart-item {
                flex-direction: column;
                align-items: flex-start;
            }
    
            .item-details {
                width: 100%;
            }
    
            .item-quantity-controls {
                margin-top: 0.5rem;
            }
    
            .remove-item {
                align-self: flex-end;
                margin-top: 1rem;
            }
        }
    
        @media (min-width: 768px) {
            .item-name {
                font-size: 1.4rem;
            }
    
            .item-price, .item-total {
                font-size: 1.1rem;
            }
    
            .quantity-control {
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
            }
    
            .remove-item {
                font-size: 1.1rem;
                padding: 0.6rem 1.2rem;
            }
        }
    `]
})

export class AppCartLineComponent {
    @Input() p: CartLine = { product: { id: 0, name: '', price: 0, isFavorite: false }, quantity: 0, lineTotal: 0 };
    cartService = inject(CartService);
    router = inject(Router);

    constructor(library: FaIconLibrary) {
        library.addIcons(faTrashAlt, faMinusCircle, faPlusCircle, faHeart);
    }

    navigateToProduct(productId: number) {
        this.router.navigate(['/products', productId]);
    }

    removeProduct(event: Event, product: any) {
        event.stopPropagation();
        this.cartService.removeProduct(product);
    }

    increaseQuantity(event: Event, product: any) {
        event.stopPropagation();
        this.cartService.addProduct(product, 1);
    }

    decreaseQuantity(event: Event, product: any) {
        event.stopPropagation();
        if (this.p.quantity > 1) {
            this.cartService.removeProduct(product, 1);
        }
    }
}
