import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filterClass'
})
export class FilterClassPipe implements PipeTransform {

  transform(products: Product[] | null | undefined, selectedClass: string[] | null | undefined): Product[] {
    // Ensure products is an array
    if (!Array.isArray(products)) {
      console.warn('filterClassPipe received invalid products:', products);
      return [];
    }

    // If selectedClass is not provided or is empty, return all products
    if (!selectedClass || selectedClass.length === 0) {
      return products;
    }

    // Filter products by class if class exists and is included in selectedClass
    return products.filter(p => p.class && selectedClass.includes(p.class));
  }
}
