import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './interfaces/product';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './components/app-product-list.component';
import { AppHeaderComponent } from './components/app-header.component';
import { AppCartComponent } from './components/app-cart.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductListComponent, AppHeaderComponent, AppCartComponent],
  template: `
    <div class="main">
      <div class="left">
        <app-header 
          [title]="title" 
          [currentFilter]="filter"
          (filterChange)="handleFilterChange($event)">
        </app-header>
        <app-product-list
          [products]="products" 
          [currentFilter]="filter"
          (productAdded)="addToCart($event)">
        </app-product-list>
      </div>

      <div class="right">
        <app-cart [cart]="cart"></app-cart>
      </div>
    </div>
    
  `,
  styles: [
    `
    .main {
      display: flex;
      justify-content: space-around;
    }

    .left {
      width: calc(100% - 150px - 2rem);
      padding: 1rem;
    }

    .right {
      width: 150px;
      height: fit-content;
      padding: 1rem;
    }
    `,
  ],
})
export class AppComponent {
  title = 'test-ang';
  filter: string = 'date-reverse'; // Valeur initiale du filtre

  productService = inject(ProductService);

  products = this.productService.getProducts();

  cart: { product: Product; quantity: number }[] = [];

  addToCart(product: Product) {
    const cartItem = this.cart.find((item) => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    console.log('Adding to cart', product);
  }

  getTotalPrice() {
    return this.cart.reduce(
      (acc, item) => acc + (item.product.price || 0) * item.quantity,
      0
    );
  }

  getCartItemsCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  trackByCartItemId(index: number, item: { product: Product; quantity: number }) {
    return item.product.id;
  }

  handleFilterChange(newFilter: string) {
    this.filter = newFilter;
    console.log('Filter changed to:', this.filter);
  }
}
