import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { SortProductsPipe } from '../pipe/sort-products.pipe';
import { SearchProductsPipe } from '../pipe/search-products.pipe';
import { ProductService } from '../services/product.service';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, SortProductsPipe, SearchProductsPipe],
  template: `
    <div class="product-container">
      <ng-container *ngFor="let p of (productService.getProducts() | searchProducts: filterService.getSearchQuery() | sortProducts: filterService.getFilter())">
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
  productService = inject(ProductService);
  filterService = inject(FilterService);
}
