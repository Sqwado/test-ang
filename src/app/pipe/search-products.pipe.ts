import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(products: Product[] | null | undefined, filter: string): Product[] {
    if (!Array.isArray(products)) {
      console.warn('searchProductsPipe received invalid products:', products);
      return [];
    }

    if (!filter) {
      return products;
    }

    return products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  }
}
