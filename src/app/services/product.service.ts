import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { LocalStorageService } from './localStorage.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private http = inject(HttpClient);
  private products = signal<Product[]>([]);
  readonly url = 'http://localhost:3000';


  
  getProductsFromApi(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
      tap(products => this.products.set(products))
    );
  }

  getProductFromApi(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`).pipe(
      tap(product => { product })
    );
  }

  localStorageService = inject(LocalStorageService);

  constructor() {
    this.loadProductsFromLocalStorage();
  }

  private loadProductsFromLocalStorage(): void {
    const storedProducts = this.localStorageService.getFavorites();
    this.products.forEach(product => {
      product.isFavorite = storedProducts.includes(product.id.toString());
    });
  }

  getProducts(onlyFavorites: boolean = false): Product[] {
    if (onlyFavorites) {
      return this.products.filter(product => product.isFavorite);
    }
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
    if (product.isFavorite) {
      this.localStorageService.addFavorite(product.id.toString());
    } else {
      this.localStorageService.removeFavorite(product.id.toString());
    }

  }
}
