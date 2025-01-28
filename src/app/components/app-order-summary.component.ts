import { Component, inject } from '@angular/core';
import { Order } from '../interfaces/order';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-summary',
    imports: [CommonModule],
    template: `
        <div class="order-summary">
        <h2>Order Summary {{ order?.id }}</h2>
        <div class="order-details">
            <p><strong>Name:</strong> {{ order?.name }}</p>
            <p><strong>Address:</strong> {{ order?.address }}</p>
            <p><strong>Items in order:</strong> {{ order?.items?.length }}</p>
            <p><strong>Total price:</strong> {{ order?.totalPrice | currency: 'EUR' }}</p>
        </div>
        </div>
    `,
    styles: [`
        .order-summary {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        }
        .order-details {
        margin-top: 10px;
        }
    `],
})
export class AppOrderSummaryComponent {

    orderService = inject(OrderService);

    order: Order | undefined;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            const orderId = params['id'];
            // Fetch the order using the orderId
            // This is just a placeholder, replace with actual order fetching logic
            this.order = this.orderService.getOrder(Number(orderId));
        });
    }

    getOrderById(id: string): Order {
        // Placeholder function to simulate fetching an order by ID
        return {
            id: Number(id),
            name: 'Sample Order',
            address: '123 Sample Street',
            items: [],
            itemCount: 0,
            totalPrice: 0
        };
    }

}
