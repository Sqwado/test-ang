import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'sortByDate',
})

export class SortByDatePipe implements PipeTransform {
  transform(products: Product[], asc: boolean = true): Product[] {
    return products.sort((a, b) => {
      // Ensure releaseDate is a Date object before calling .getTime()
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      
      return asc ? dateA - dateB : dateB - dateA;
    });
  }
}
