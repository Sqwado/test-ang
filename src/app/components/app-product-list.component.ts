import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { SortProductsPipe } from '../pipe/sort-products.pipe';
import { SearchProductsPipe } from '../pipe/search-products.pipe';
import { ProductService } from '../services/product.service';
import { FilterService } from '../services/filter.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, SortProductsPipe, SearchProductsPipe],
  template: `
    <div class="product-container">
      <ng-container *ngIf="products$ | async as products; else loading">
        <div *ngFor="let p of (products | searchProducts: filterService.getSearchQuery() | sortProducts: filterService.getFilter())">
          <app-product-card [product]="p" class="product-card"></app-product-card>
        </div>
      </ng-container>
      <ng-template #loading>
        <p>Loading products...</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .product-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: 1rem;
    }
  `]
})
export class ProductListComponent {
  @Input() onlyFavorites: boolean = false;
  products$: Observable<Product[]> = new Observable<Product[]>();
  ngOnInit() {
    console.log('onlyFavorites:', this.onlyFavorites);
    this.products$ = this.productService.getProducts(this.onlyFavorites);
  }
  productService = inject(ProductService);
  filterService = inject(FilterService);
}
