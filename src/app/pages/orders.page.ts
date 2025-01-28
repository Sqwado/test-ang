import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
    imports: [CommonModule],
    template: `
        <div class="order-list">
            <h2>All Orders</h2>
            <ul>
                <li *ngFor="let order of orderService.orders" (click)="router.navigate(['/order-summary', order.id])">
                    <strong>Order ID:</strong> {{ order.id }}<br>
                    <strong>Name:</strong> {{ order.name }}<br>
                    <strong>Date:</strong> {{ order.date | date: 'dd/MM/yyyy' }}
                </li>
            </ul>
        </div>
    `,
    styles: [`
        .order-list {
            padding: 20px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
            cursor: pointer;
        }
    `],
})
export class OrderListComponent {

    orderService = inject(OrderService);
    router = inject(Router);
}
