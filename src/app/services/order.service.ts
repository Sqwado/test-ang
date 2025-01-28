import { Injectable, inject } from '@angular/core';
import { Order } from '../interfaces/order';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  orders: Order[] = [];

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
    this.orders.push(order);
    this.localStorageService.addOrder(order);
  }

  clearOrders(): void {
    this.orders = [];
    this.localStorageService.clearOrders();
  }
}

