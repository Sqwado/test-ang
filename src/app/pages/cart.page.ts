import { Component } from '@angular/core';
import { AppCartComponent } from '../components/app-cart.component';

@Component({
  selector: 'page-cart',
  imports: [AppCartComponent],
  standalone: true,
  template: `
    <app-cart/>
  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }

    `,
  ],
})
export class CartPage {

}
