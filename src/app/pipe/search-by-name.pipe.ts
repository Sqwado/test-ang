import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'searchByName',
})
export class SearchByNamePipe implements PipeTransform {
  transform(products: Product[], search: string): Product[] {
    if (!search) {
      return products;
    }
    return products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
  }
}
