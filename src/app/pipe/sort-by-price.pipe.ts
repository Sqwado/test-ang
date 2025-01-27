import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'sortByPrice'
})

export class SortByPricePipe implements PipeTransform {

  transform(products: Product[], asc: boolean = true): Product[] {
    return products.sort((a, b) => {
      return asc ? (a.price ?? 0) - (b.price ?? 0) : (b.price ?? 0) - (a.price ?? 0);
    });
  }
}
