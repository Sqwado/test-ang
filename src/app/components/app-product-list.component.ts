import { Component, Input, inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { SortProductsPipe } from '../pipe/sort-products.pipe';
import { SearchProductsPipe } from '../pipe/search-products.pipe';
import { ProductService } from '../services/product.service';
import { FilterService } from '../services/filter.service';
import { Product } from '../interfaces/product';
import { FilterClassPipe } from '../pipe/filter-class.pipe';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent, SortProductsPipe, SearchProductsPipe, FilterClassPipe],
  template: `
    <div class="product-container">
      <ng-container *ngIf="products$ | async as products; else loading">
        <ng-container *ngIf="products.length > 0; else noProducts">
          <div *ngFor="let p of (products | searchProducts: filterService.getSearchQuery() | filterClass: filterService.getSelectedClass() | sortProducts: filterService.getFilter())">
            <app-product-card [product]="p" class="product-card"></app-product-card>
          </div>
        </ng-container>
      </ng-container>
      <ng-template #loading>
        <p>Loading products...</p>
      </ng-template>
      <ng-template #noProducts>
        <p>No products found.</p>
      </ng-template>
      <ng-template #error>
        <p>Error loading products. Please try again later.</p>
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
export class ProductListComponent implements OnInit {
  @Input() onlyFavorites: boolean = false;
  products$: Observable<Product[]> = new Observable<Product[]>();
  ngOnInit() {
    console.log('onlyFavorites:', this.onlyFavorites);
    this.products$ = this.productService.getProducts(this.onlyFavorites).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]);
      })
    );
  }
  productService = inject(ProductService);
  filterService = inject(FilterService);
}
