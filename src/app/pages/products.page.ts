import { Component } from '@angular/core';
import { ProductListComponent } from '../components/app-product-list.component';
import { AppFilterComponent } from '../components/app-filter.component';

@Component({
    selector: 'page-products',
    imports: [ProductListComponent, AppFilterComponent],
    standalone: true,
    template: `
    <div>
        <app-filter/>
        <app-product-list/>
    </div>
  `,
    styles: [
        `
    `,
    ],
})
export class ProductsPage {

}
