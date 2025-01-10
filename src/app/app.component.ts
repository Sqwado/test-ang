import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';
import { Product } from './product';
import { SortByDate } from './sort-by-date.pipe';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ProductCardComponent, SortByDate],
  template: `
  <div class="left">
    <h1>Welcome to {{title}}!</h1>
    <div class="product-container">
      <ng-container *ngFor="let p of (products | sortByDate:true); trackBy: trackByProductId" >
        <app-product-card 
        [product]="p" 
        (productAdded)="addToCart($event)"
        class="product-card"/>
      </ng-container>
    </div>
  </div>
  <div class="right">
    <div>
      <div class="cart-header">
        <h2>Cart</h2>
        <button (click)="cart = []">Clear cart</button>
      </div>
      <p>Items in cart: {{getCartItemsCount()}}</p>
      <p>Total price: {{getTotalPrice() | currency:'EUR'}}</p>
    </div>
    <ul>
      <ng-container *ngFor="let p of cart; trackBy: trackByCartItemId">
        <li>{{p.product.name}} - x{{p.quantity}}</li>
      </ng-container>
    </ul>
  </div>

    <router-outlet />
  `,
  styles: [
    `
    .left {
      float: left;
      width: calc(100% - 200px - 2rem);
    }
  
    .right {
      border-left: 1px solid #ccc;
      padding: 1rem;
      float: right;
      width: 199px;
      height: 100vh;
    }

    .cart-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 100%;
    }

    button {
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

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin: 0.5rem 0;
    }

    .product-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    `
  ],
})
export class AppComponent {
  title = 'test-ang';

  products: Product[] = [
    { id: 1, name: 'RTX 5090', description: 'The best GPU ever', price: 2349.99, releaseDate: new Date('2025-01-30') },
    { id: 2, name: 'RTX 5080', description: 'The new standard in GPUs for gaming', price: 1179.99, isFavorite: true, releaseDate: new Date('2025-01-30') },
    { id: 3, name: 'RTX 5070 TI', description: 'Mid-range GPU with great performance', price: 884.99, releaseDate: new Date('2025-02-15') },
    { id: 4, name: 'RTX 5070', description: 'Great performance at a great price', price: 649.99, releaseDate: new Date('2025-02-15') },
    { id: 5, name: 'RTX 5060', description: 'Entry-level GPU for gaming', price: 399.99, releaseDate: new Date('2025-03-01') },
    { id: 6, name: 'RTX 4090', description: 'The best GPU ever', price: 1599.99, releaseDate: new Date('2022-10-30') },
  ];

  cart: { product: Product, quantity: number }[] = [];

  addToCart(product: Product) {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    console.log('Adding to cart', product);
  }

  getTotalPrice() {
    return this.cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  }

  getCartItemsCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  trackByProductId(index: number, item: Product) {
    return item.id;
  }

  trackByCartItemId(index: number, item: { product: Product; quantity: number }) {
    return item.product.id;
  }

}
