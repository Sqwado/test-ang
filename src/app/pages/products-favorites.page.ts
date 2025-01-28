import { Component } from '@angular/core';
import { ProductListComponent } from '../components/app-product-list.component';
import { AppFilterComponent } from '../components/app-filter.component';

@Component({
    selector: 'page-products-favorites',
    imports: [ProductListComponent, AppFilterComponent],
    standalone: true,
    template: `
    <div>
        <app-filter/>
        <app-product-list [onlyFavorites]="true"/>
    </div>
  `,
    styles: [
        `
    `,
    ],
})
export class ProductsFavoritesPage {

}
