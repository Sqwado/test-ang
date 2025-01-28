import { Component } from '@angular/core';
import { AppOrderSummaryComponent } from '../components/app-order-summary.component';

@Component({
  selector: 'page-order-summary',
  imports: [AppOrderSummaryComponent],
  standalone: true,
  template: `
    <app-order-summary/>
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
export class OrderSummaryPage {

}