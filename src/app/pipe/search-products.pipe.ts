import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(products: Product[], filter: string): Product[] {
    return products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  }
}
