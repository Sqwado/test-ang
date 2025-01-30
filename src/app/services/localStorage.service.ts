import { Injectable } from '@angular/core';

interface CartItem {
    id: string;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private readonly cartKey = 'shoppingCart';
    private readonly favoritesKey = 'favoriteItems';
    private readonly ordersKey = 'orders';

    private setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private getItem<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    private removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Shopping cart methods
    addToCart(itemId: string, quantity: number = 1): void {
        const cart = this.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.unshift({ id: itemId, quantity });
        }
        this.setItem(this.cartKey, cart);
    }

    removeFromCart(itemId: string, quantity: number = 1): void {
        const cart = this.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            if (existingItem.quantity > quantity) {
                existingItem.quantity -= quantity;
            } else {
                this.setItem(this.cartKey, cart.filter(cartItem => cartItem.id !== itemId));
            }
        }
    }

    getCart(): CartItem[] {
        return this.getItem<CartItem[]>(this.cartKey) || [];
    }

    clearCart(): void {
        this.removeItem(this.cartKey);
    }

    // Favorite items methods
    addFavorite(itemId: string): void {
        const favorites = this.getFavorites();
        if (!favorites.includes(itemId)) {
            favorites.push(itemId);
            this.setItem(this.favoritesKey, favorites);
        }
    }

    removeFavorite(itemId: string): void {
        this.setItem(this.favoritesKey, this.getFavorites().filter(favId => favId !== itemId));
    }

    getFavorites(): string[] {
        return this.getItem<string[]>(this.favoritesKey) || [];
    }

    clearFavorites(): void {
        this.removeItem(this.favoritesKey);
    }

    // Order methods
    addOrder(order: any): void {
        const orders = this.getOrders();
        orders.unshift(order);
        this.setItem(this.ordersKey, orders);
    }

    getOrders(): any[] {
        return this.getItem<any[]>(this.ordersKey) || [];
    }

    clearOrders(): void {
        this.removeItem(this.ordersKey);
    }
}
