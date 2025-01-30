import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faArrowLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service'; ``
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Component({
    imports: [FontAwesomeModule, CommonModule, FormsModule],
    standalone: true,
    template: `
    <div class="details-page">
    <button class="back-button" (click)="goBack()" aria-label="Retour à la page précédente">
        <fa-icon [icon]="['fas', 'arrow-left']"></fa-icon> Retour
    </button>
    <div class="details-container" *ngIf="product | async as productData">
        <div class="product-image-container">
            <img [src]="productData.imageUrl" [alt]="productData.name" class="product-image">
        </div>
        <div class="header">
            <h1>{{ productData.name }}</h1>
            <button (click)="toggleFavorite($event)" [class.filled]="productData.isFavorite" class="favorite">
                <span *ngIf="productData.isFavorite">&#x2665;</span>
                <span *ngIf="!productData.isFavorite">&#x2661;</span>
            </button>
        </div>
        <p class="description">{{ productData.description }}</p>
        <p class="price">Price: {{ productData.price | currency:'EUR' }}</p>
        <p class="release-date">Release Date: {{ productData.releaseDate | date:'fullDate':'':'fr' }}</p>
        
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
    <div *ngIf="!(product | async)" class="not-found">
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
            width: calc(100% - 16px);
            margin: 8px;
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
            width: calc(100% - 64px);
            padding: 16px;
            margin: 0 auto;
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
            gap: 16px;
        }

        h1 {
            margin: 0;
            font-size: 32px;
            color: #222;
            white-space: nowrap;
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
                padding: 10px;
                width: calc(100% - 20px);
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
                padding: 5px;
                width: calc(100% - 10px);
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
    toastr = inject(ToastrService);

    product: Observable<Product> | null = null;
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
            this.product?.subscribe(product => {
                this.cartService.addProduct(product, this.quantity);
            });
        }
    }

    toggleFavorite(event: Event) {
        event.stopPropagation();
        let favToast = '';
        this.product?.subscribe(product => {
            favToast = product.isFavorite ? 'Removed from favorites!' : 'Added to favorites!';
            this.productService.toggleFavorite(product);
            this.toastr.success(favToast, 'Success', {
                toastClass: 'ngx-toastr favorite-toast',
                positionClass: 'toast-bottom-right',
            });
        });
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
