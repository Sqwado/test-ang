import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
<div class="details-container" (click)="redirectToProduct(product.id)">
  <div class="product-image-container">
    <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
  </div>
  <div class="header">
    <h2>{{product.name}}</h2>
    <button (click)="toggleFavorite($event)" [class.filled]="product.isFavorite" class="favorite">
      <span *ngIf="product.isFavorite">&#x2665;</span>
      <span *ngIf="!product.isFavorite">&#x2661;</span>
    </button>
  </div>
  <p class="description">{{product.description}}</p>
  <p *ngIf="product.price" class="price">Price: {{product.price | currency:'EUR'}}</p>
  <p *ngIf="product.releaseDate" class="release-date">Release date: {{product.releaseDate | date:'shortDate':'':'fr'}}</p>
  <div class="button-container">
    <button (click)="addToCart($event)" class="add-to-cart">Add to Cart</button>
  </div>
</div>
  `,
  styles: `
  :host {
    display: block;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .details-container {
    width: 250px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   cursor: pointer;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }

  .description {
    margin: 10px 0;
    color: #666;
    font-size: 16px;
  }

  .price {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
  }

  .release-date {
    font-size: 14px;
    color: #888;
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #007bff;
  }

  .back-button {
    display: flex;
    align-items: center;
  }

  .back-button fa-icon {
    margin-right: 8px;
  }

  .add-to-cart {
    background-color: #28a745;
  }

  .add-to-cart:hover {
    background-color: #218838;
  }

  .favorite {
    font-size: 24px;
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    transition: color 0.3s ease;
    border: 1px solid black;
    padding: 10px 20px;
  }

  .favorite.filled {
    color: red;
  }

  .favorite:hover {
    color: #ff6b6b;
  }

  .not-found {
    text-align: center;
    margin: 50px 0;
    font-size: 18px;
    color: #666;
  }

  @media (max-width: 600px) {
    .details-container {
      padding: 8px;
      font-size: 14px;
    }

    h1 {
      font-size: 20px;
    }

    .description {
      font-size: 14px;
    }

    .price {
      font-size: 16px;
    }

    .release-date {
      font-size: 12px;
    }

    .button-container {
      flex-direction: column;
      align-items: stretch;
    }

    button {
      justify-content: center;
    }

    .favorite {
      font-size: 20px;
    }
  }
  `,
})
export class ProductCardComponent {

  @Input() product: Product | Product = { id: 0, name: 'Default Name', description: 'Default Description' };
  productService = inject(ProductService);
  cartService = inject(CartService);
  router = inject(Router);
  toastr = inject(ToastrService);

  redirectToProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addProduct(this.product);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    const favToast = this.product.isFavorite ? 'Removed from favorites!' : 'Added to favorites!';
    this.productService.toggleFavorite(this.product);
    this.toastr.success(favToast, 'Success', {
      toastClass: 'ngx-toastr favorite-toast',
      positionClass: 'toast-bottom-right',
    });
  }
}
