import { Component, inject } from '@angular/core';
import { Order } from '../interfaces/order';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-summary',
    imports: [CommonModule],
    template: `
        <div class="order-summary">
            <h2>Order Summary {{ order?.id }}</h2>
            <div class="order-details">
                <p><strong>Name:</strong> {{ order?.name }}</p>
                <p><strong>Address:</strong> {{ order?.address }}</p>
                <p><strong>Date:</strong> {{ order?.date | date: 'dd/MM/yyyy' }}</p>
                <p><strong>Items in cart:</strong> {{ order?.cart?.itemCount ?? 0 }}</p>
                <p><strong>Total price:</strong> {{ order?.cart?.cartPrice | currency: 'EUR' }}</p>
            </div>
            <button (click)="goBack()">Retour</button>
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
        button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        }
        button:hover {
        background-color: #0056b3;
        }
    `],
})
export class AppOrderSummaryComponent {

    router = inject(Router);
    location = inject(Location);
    orderService = inject(OrderService);

    order: Order | undefined;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            const orderId = params['id'];
            if (orderId) {
                this.order = this.orderService.getOrder(Number(orderId));

                if (!this.order) {
                    console.error('Order not found');
                    this.router.navigate(['/orders']);
                }

            } else {
                // Handle the case where orderId is not found
                console.error('Order ID not found in route parameters');
                this.router.navigate(['/orders']);
            }
        });
    }

    goBack() {
        this.location.back();
    }
}
