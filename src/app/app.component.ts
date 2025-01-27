import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './interfaces/product';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './components/app-product-list.component';
import { AppHeaderComponent } from './components/app-header.component';
import { AppFooterComponent } from './components/app-footer.component';
import { AppFilterComponent } from './components/app-filter.component';
import { AppCartComponent } from './components/app-cart.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ProductListComponent, AppHeaderComponent, AppFooterComponent, AppCartComponent, AppFilterComponent],
  template: `
    <div class="main">
      <app-header 
        [title]="title">
      </app-header>
      <div class="content">
        <div class="left">
        <app-filter
          [currentFilter]="filter"
          (filterChange)="handleFilterChange($event)"
          [searchQuery]="searchQuery"
          (searchChange)="handleSearchChange($event)">
        </app-filter>
          <app-product-list
            [products]="products" 
            [currentFilter]="filter"
            [searchQuery]="searchQuery">
          </app-product-list>
        </div>
        <div class="right">
          <app-cart/>
        </div>
      </div>
      <app-footer/>
    </div>
  `,
  styles: [
    `
    html, body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      height: 100%;
    }

    .main {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      height: 100vh;
    }

    .content {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
    }

    .left {
      width: calc(100% - 200px);
    }

    .right {
      width: 200px;
      height: fit-content;
    }

    @media (max-width: 600px) {      
      .content {
        flex-direction: column;
      }
      .left {
        width: 100%;
      }
      .right {
        width: 100%;
        margin-top: 1rem;
      }
    }

    `,
  ],
})
export class AppComponent {
  title = 'NVIDIA reseller';
  filter: string = 'date-reverse'; // Valeur initiale du filtre
  searchQuery: string = ''; // Valeur initiale de la recherche

  productService = inject(ProductService);

  products = this.productService.getProducts();

  handleFilterChange(newFilter: string) {
    this.filter = newFilter;
    console.log('Filter changed to:', this.filter);
  }

  handleSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    console.log('Search changed to:', this.searchQuery);
  }
}
