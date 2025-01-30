import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { LocalStorageService } from './localStorage.service';
import { Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private products = signal<Product[]>([]);
  readonly url = 'http://localhost:3000';
  private localStorageService = inject(LocalStorageService);

  getProductsFromApi(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
      tap(products => {
        this.updateFavoriteStatus(products);
        this.products.set(products);
      })
    );
  }

  getProductFromApi(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}`).pipe(
      tap(product => this.updateFavoriteStatus([product]))
    );
  }

  private updateFavoriteStatus(products: Product[]): void {
    const storedFavorites = this.localStorageService.getFavorites();
    products.forEach(product => {
      product.isFavorite = storedFavorites.includes(product.id.toString());
    });
  }

  getProducts(onlyFavorites: boolean = false): Observable<Product[]> {
    return this.getProductsFromApi().pipe(
      map(products => onlyFavorites ? products.filter(product => product.isFavorite) : products)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.getProductFromApi(id);
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
