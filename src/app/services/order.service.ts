import { Injectable, inject } from '@angular/core';
import { Order } from '../interfaces/order';
import { LocalStorageService } from './localStorage.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  orders: Order[] = [];
  cartService = inject(CartService);

  localStorageService = inject(LocalStorageService);

  constructor() {
    this.loadOrdersFromLocalStorage();
  }

  private loadOrdersFromLocalStorage(): void {
    const storedOrders = this.localStorageService.getOrders();
    this.orders = storedOrders;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: number): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  addOrder(order: Order): void {
    this.orders.unshift(order);
    this.localStorageService.addOrder(order);
  }

  placeOrder(name: string, address: string): number {
    const id = Math.floor(Math.random() * 1000000);
    const order: Order = {
      id,
      name,
      address,
      date: new Date(),
      cart: this.cartService.cart
    };
    this.addOrder(order);
    this.cartService.clearCart();
    return id;
  }

  clearOrders(): void {
    this.orders = [];
    this.localStorageService.clearOrders();
  }
}

