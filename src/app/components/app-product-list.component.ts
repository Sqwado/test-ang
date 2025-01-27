import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductCardComponent } from './product-card.component';
import { SortProductsPipe } from '../pipe/sort-products.pipe';
import { SearchProductsPipe } from '../pipe/search-products.pipe';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, SortProductsPipe, SearchProductsPipe],
  template: `
    <div class="product-container">
      <ng-container *ngFor="let p of (products | searchProducts: searchQuery | sortProducts: currentFilter)">
        <app-product-card 
          [product]="p" 
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
  @Input() searchQuery: string = '';
}
