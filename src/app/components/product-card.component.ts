import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  template: `
  <div class="card">
    <div class="header">
      <h2>{{product.name}}</h2>
      <div *ngIf="product.isFavorite">Favorite</div>
    </div>
    <p class="description">{{product.description}}</p>
    <p *ngIf="product.price">Price: {{product.price | currency:'EUR'}}</p>
    <p *ngIf="product.releaseDate">Release date: {{product.releaseDate | date:'fullDate':'':'fr'}}</p>
    <div class="button-container">
      <button (click)="addToCart()">Add to Cart</button>
      <button (click)="toggleFavorite()" [class.filled]="product.isFavorite" class="favorite">
        <span *ngIf="product.isFavorite">&#x2764;</span>
        <span *ngIf="!product.isFavorite">&#x2661;</span>
      </button>
    </div>
  </div>
  `,
  styles: `
  .card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem;
    width: 200px; /* Réduire la largeur de la carte */
  }

  .description {
    height: 75px;
    overflow-y: scroll;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  button.filled {
    color: red;
  }

  span {
    font-size: 1.5rem;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .favorite {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `,
})
export class ProductCardComponent {

  @Input() product: Product | Product = { id: 0, name: 'Default Name', description: 'Default Description' };
  @Output() productAdded = new EventEmitter();
  productService = inject(ProductService);

  addToCart() {
    // Logic to add the product to the cart
    console.log(`${this.product.name} added to cart`);
    this.productAdded.emit(this.product);
  }

  toggleFavorite() {
    this.productService.toggleFavorite(this.product);
  }

}
