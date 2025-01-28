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

    setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    // Shopping cart methods
    addToCart(itemId: string, quantity: number = 1): void {
        const cart = this.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: itemId, quantity });
        }
        this.setItem(this.cartKey, cart);
    }

    removeFromCart(itemId: string, quantity: number = 1): void {
        let cart = this.getCart();
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            if (existingItem.quantity > quantity) {
                existingItem.quantity -= quantity;
            } else {
                cart = cart.filter(cartItem => cartItem.id !== itemId);
            }
            this.setItem(this.cartKey, cart);
        }
    }

    getCart(): CartItem[] {
        return this.getItem(this.cartKey) || [];
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
        let favorites = this.getFavorites();
        favorites = favorites.filter(favId => favId !== itemId);
        this.setItem(this.favoritesKey, favorites);
    }

    getFavorites(): string[] {
        return this.getItem(this.favoritesKey) || [];
    }

    clearFavorites(): void {
        this.removeItem(this.favoritesKey);
    }
}
