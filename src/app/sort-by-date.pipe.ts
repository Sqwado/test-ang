import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'sortByDate'
})
export class SortByDate implements PipeTransform {
  transform(products: Product[], asc: boolean = true): Product[] {
    return products.sort((a, b) => {
      const dateA = a.releaseDate ? a.releaseDate.getTime() : 0;
      const dateB = b.releaseDate ? b.releaseDate.getTime() : 0;
      return asc ? dateA - dateB : dateB - dateA;
    });
  }
}
