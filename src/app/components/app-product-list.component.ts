import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductCardComponent } from './product-card.component';
import { SortProductsPipe } from '../pipe/sort-products.pipe';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, SortProductsPipe],
  template: `
    <div class="product-container">
      <ng-container *ngFor="let p of (products | sortProducts: currentFilter)">
        <app-product-card 
          [product]="p" 
          (productAdded)="onAddToCart($event)"
          class="product-card" />
      </ng-container>
    </div>
  `,
  styles: [`
    .product-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  `]
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() currentFilter: string = '';
  @Output() productAdded = new EventEmitter<Product>();

  onAddToCart(product: Product) {
    this.productAdded.emit(product);
  }
}
