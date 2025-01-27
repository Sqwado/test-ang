import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'sortByName',
})

export class SortByNamePipe implements PipeTransform {
  transform(products: Product[], asc: boolean = true): Product[] {
    return products.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }
}
