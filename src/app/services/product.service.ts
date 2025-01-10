import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    { id: 1, name: 'RTX 5090', description: 'The best GPU ever', price: 2349.99, releaseDate: new Date('2025-01-30') },
    { id: 2, name: 'RTX 5080', description: 'The new standard in GPUs for gaming', price: 1179.99, isFavorite: true, releaseDate: new Date('2025-01-30') },
    { id: 3, name: 'RTX 5070 TI', description: 'Mid-range GPU with great performance', price: 884.99, releaseDate: new Date('2025-02-15') },
    { id: 4, name: 'RTX 5070', description: 'Great performance at a great price', price: 649.99, releaseDate: new Date('2025-02-15') },
    { id: 5, name: 'RTX 5060', description: 'Entry-level GPU for gaming', price: 399.99, releaseDate: new Date('2025-03-01') },
    { id: 6, name: 'RTX 4090', description: 'The best GPU ever', price: 1599.99, releaseDate: new Date('2022-10-30') },
    { id: 7, name: 'RTX 4080', description: 'The new standard in GPUs for gaming', price: 799.99, isFavorite: true, releaseDate: new Date('2022-10-30') },
    { id: 8, name: 'RTX 4070 TI', description: 'Mid-range GPU with great performance', price: 599.99, releaseDate: new Date('2022-11-15') },
    { id: 9, name: 'RTX 4070', description: 'Great performance at a great price', price: 449.99, releaseDate: new Date('2022-11-15') },
    { id: 10, name: 'RTX 4060', description: 'Entry-level GPU for gaming', price: 279.99, releaseDate: new Date('2022-12-01') },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
    console.log(`${product.name} favorite status: ${product.isFavorite}`);
  }

}
