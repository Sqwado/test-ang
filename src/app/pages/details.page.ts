import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faArrowLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
    imports: [FontAwesomeModule, CommonModule, FormsModule],
    standalone: true,
    template: `
    <div class="details-page">
    <button class="back-button" (click)="goBack()" aria-label="Retour à la page précédente">
        <fa-icon [icon]="['fas', 'arrow-left']"></fa-icon> Retour
    </button>
    <div class="details-container" *ngIf="product">
        <div class="header">
            <h1>{{ product.name }}</h1>
            <button (click)="toggleFavorite()" [class.filled]="product.isFavorite" class="favorite" aria-label="Ajouter aux favoris">
                <span *ngIf="product.isFavorite">&#x2764;</span>
                <span *ngIf="!product.isFavorite">&#x2661;</span>
            </button>
        </div>
        <p class="description">{{ product.description }}</p>
        <p class="price">Price: {{ product.price | currency:'EUR' }}</p>
        <p class="release-date">Release Date: {{ product.releaseDate | date:'fullDate':'':'fr' }}</p>
        
        <!-- Quantity adjustment -->
        <div class="quantity-container">
            <button (click)="decreaseQuantity()" class="quantity-button" aria-label="Diminuer la quantité">
                <fa-icon [icon]="['fas', 'minus']"></fa-icon>
            </button>
            <input [(ngModel)]="quantity" [min]="1" type="number" class="quantity-input" aria-label="Quantité" />
            <button (click)="increaseQuantity()" class="quantity-button" aria-label="Augmenter la quantité">
                <fa-icon [icon]="['fas', 'plus']"></fa-icon>
            </button>
        </div>

        <div class="button-container">
            <button (click)="addToCart()" class="add-to-cart" aria-label="Ajouter au panier">Ajouter au panier</button>
        </div>
    </div>
    <div *ngIf="!product" class="not-found">
        <p>Product not found</p>
    </div>
</div>

  `,
    styles: [
        `
        :host {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100vw;
            box-sizing: border-box;
            background-color: #f2f4f8;
        }

        .details-page {
            position: relative;
            width: 100%;
        }

        .back-button {
            position: absolute;
            top: 16px;
            left: 16px;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 16px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }

        .back-button:hover {
            background-color: #0056b3;
        }

        .details-container {
            margin: 80px auto 0;
            max-width: 800px;
            width: 100%;
            padding: 32px;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            border-bottom: 2px solid #eee;
            padding-bottom: 12px;
        }

        h1 {
            margin: 0;
            font-size: 32px;
            color: #222;
        }

        .description {
            margin: 16px 0;
            color: #555;
            font-size: 18px;
            line-height: 1.6;
        }

        .price {
            font-size: 22px;
            font-weight: bold;
            color: #007bff;
            margin-top: 12px;
        }

        .release-date {
            font-size: 16px;
            color: #888;
            margin-top: 4px;
        }

        .quantity-container {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 16px;
        }

        .quantity-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 20px;
        }

        .quantity-button:hover {
            background-color: #0056b3;
        }

        .quantity-input {
            width: 60px;
            text-align: center;
            font-size: 18px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }

        .button-container {
            display: flex;
            justify-content: flex-end;
            margin-top: 32px;
        }

        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }

        .add-to-cart {
            background-color: #28a745;
        }

        .add-to-cart:hover {
            background-color: #218838;
        }

        .favorite {
            font-size: 28px;
            background: none;
            border: none;
            color: #ccc;
            cursor: pointer;
            transition: color 0.3s ease;
        }

        .favorite.filled {
            color: red;
        }

        .favorite:hover {
            color: #ff4d4d;
        }

        .not-found {
            text-align: center;
            margin: 50px 0;
            font-size: 20px;
            color: #666;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .details-container {
                padding: 20px;
            }

            h1 {
                font-size: 28px;
            }

            .description {
                font-size: 16px;
            }

            .price {
                font-size: 20px;
            }

            .release-date {
                font-size: 14px;
            }

            .quantity-container {
                gap: 8px;
            }

            .quantity-button {
                font-size: 18px;
                padding: 6px 12px;
            }

            .quantity-input {
                width: 50px;
                font-size: 16px;
            }

            .button-container {
                flex-direction: column;
                align-items: stretch;
            }

            button {
                width: 100%;
                justify-content: center;
            }

            .favorite {
                font-size: 24px;
            }
        }

        @media (max-width: 480px) {
            .details-container {
                padding: 15px;
            }

            h1 {
                font-size: 24px;
            }

            .description {
                font-size: 14px;
            }

            .price {
                font-size: 18px;
            }

            .release-date {
                font-size: 12px;
            }

            .quantity-container {
                gap: 6px;
            }

            .quantity-button {
                font-size: 16px;
                padding: 4px 8px;
            }

            .quantity-input {
                width: 45px;
                font-size: 14px;
            }

            .button-container {
                flex-direction: column;
                align-items: stretch;
            }

            button {
                width: 100%;
                justify-content: center;
            }

            .favorite {
                font-size: 20px;
            }
        }
        `,
    ],
})
export class DetailsPage implements OnInit {
    productService = inject(ProductService);
    cartService = inject(CartService);
    route = inject(ActivatedRoute);
    id: number | null = null;
    location = inject(Location);
    faIconLibrary = inject(FaIconLibrary);

    product: any;
    quantity: number = 1;

    constructor() {
        this.faIconLibrary.addIcons(faArrowLeft, faPlus, faMinus);
    }

    ngOnInit() {
        const idParam = this.route.snapshot.paramMap.get('id');
        this.id = idParam !== null ? +idParam : null;
        if (this.id) {
            this.product = this.productService.getProduct(+this.id);
        }
    }

    goBack() {
        this.location.back();
    }

    addToCart() {
        if (this.product) {
            this.cartService.addProduct(this.product, this.quantity);
        }
    }

    toggleFavorite() {
        if (this.product) {
            this.productService.toggleFavorite(this.product);
        }
    }

    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
