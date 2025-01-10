import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
import { SortByDatePipe } from './sort-by-date.pipe';
import { SortByNamePipe } from './sort-by-name.pipe';
import { SortByPricePipe } from './sort-by-price.pipe';

@Pipe({
  name: 'sortProducts'
})
export class SortProductsPipe implements PipeTransform {

  transform(products: Product[], filter: string): Product[] {
    const { pipe, params } = this.getPipeAndParams(filter);
    const booleanParams = params.map(param => param === 'reverse' ? false : true);
    return pipe ? pipe.prototype.transform(products, ...booleanParams) : products;
  }

  getPipeAndParams(filterValue: string) {
    switch (filterValue) {
      case 'date':
        return { pipe: SortByDatePipe, params: [] };
      case 'date-reverse':
        return { pipe: SortByDatePipe, params: ['reverse'] };
      case 'name':
        return { pipe: SortByNamePipe, params: [] };
      case 'name-reverse':
        return { pipe: SortByNamePipe, params: ['reverse'] };
      case 'price':
        return { pipe: SortByPricePipe, params: [] };
      case 'price-reverse':
        return { pipe: SortByPricePipe, params: ['reverse'] };
      default:
        return { pipe: null, params: [] };
    }
  }
}