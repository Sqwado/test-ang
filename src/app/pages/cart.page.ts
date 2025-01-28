import { Component } from '@angular/core';
import { AppCartComponent } from '../components/app-cart.component';

@Component({
  selector: 'page-products',
  imports: [AppCartComponent],
  standalone: true,
  template: `
    <div>
      <app-cart/>
    </div>
  `,
  styles: [
    `
    `,
  ],
})
export class CartPage {

}
