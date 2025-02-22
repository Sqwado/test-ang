import { inject, Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { CartLine } from '../interfaces/cart-line';
import { LocalStorageService } from './localStorage.service';
import { ProductService } from './product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = { lines: [], itemCount: 0, cartPrice: 0 };
  router = inject(Router);

  localStorageService = inject(LocalStorageService);
  productService = inject(ProductService);

  constructor(private toastr: ToastrService) {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage(): void {
    const storedCartItems = this.localStorageService.getCart();
    this.cart.lines = [];
    storedCartItems.forEach(item => {
      this.productService.getProduct(parseInt(item.id, 10)).subscribe(product => {
        if (product) {
          this.cart.lines.push({ product, quantity: item.quantity, lineTotal: 0 });
          this.cart.lines.forEach(line => {
            line.lineTotal = this.getLineTotal(line);
          });
          this.cart.cartPrice = this.getTotalPrice();
          this.cart.itemCount = this.getCartItemsCount();
        }
      });
    });

    this.cart.lines.forEach(line => {
      line.lineTotal = this.getLineTotal(line);
    });

    this.cart.cartPrice = this.getTotalPrice();
    this.cart.itemCount = this.getCartItemsCount();
  }


  addProduct(product: Product, quantity = 1): void {
    const line = this.cart.lines.find(l => l.product.id === product.id);
    if (line) {
      line.quantity += quantity;
      line.lineTotal += (product.price ?? 0) * quantity;
    } else {
      this.cart.lines.unshift({ product, quantity: quantity, lineTotal: (product.price ?? 0) * quantity });}

    this.localStorageService.addToCart(product.id.toString(), quantity);

    // Update the cart price
    this.cart.cartPrice = this.getTotalPrice();
    this.cart.itemCount = this.getCartItemsCount();

    // Show success toast
    const message = quantity > 1 ? `${quantity} ${product.name} added to cart!` : `${product.name} added to cart!`;
    this.toastr.success(message, 'Success', {
      positionClass: 'toast-bottom-right'
    }).onTap.subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }

  removeProduct(product: Product, quantity = 1): void {
    const index = this.cart.lines.findIndex(l => l.product.id === product.id);
    if (index !== -1) {
      const line = this.cart.lines[index];
      line.quantity -= quantity;
      line.lineTotal -= (product.price ?? 0) * quantity;
      if (line.quantity <= 0) {
        this.cart.lines.splice(index, 1);
      }
    }

    this.localStorageService.removeFromCart(product.id.toString(), quantity);

    // Update the cart price
    this.cart.cartPrice = this.getTotalPrice();
    this.cart.itemCount = this.getCartItemsCount();

    // Show success toast with trash icon
    const message = quantity > 1
      ? `${quantity} ${product.name} removed from cart!`
      : `${product.name} removed from cart!`;

    // Toast avec une icône de poubelle
    this.toastr.success(
      `<i class="fa fa-trash" style="color: red; margin-right: 8px;"></i> ${message}`,
      'Success',
      {
        enableHtml: true,
        positionClass: 'toast-bottom-right'
      }
    ).onTap.subscribe(() => {
      // Redirection vers le panier au clic sur le toast
      this.router.navigate(['/cart']);
    });
  }

  clearCart(): void {
    this.cart.lines = [];

    this.localStorageService.clearCart();
  }

  getCartLines(): CartLine[] {
    return this.cart.lines;
  }

  getTotalPrice(): number {
    return this.cart.lines.reduce((acc, line) => acc + line.lineTotal, 0);
  }

  getCartItemsCount(): number {
    return this.cart.lines.reduce((acc, line) => acc + line.quantity, 0);
  }

  getLineTotal(line: CartLine): number {
    return (line.product.price ?? 0) * line.quantity;
  }

  trackByCartLineId(_: number, line: CartLine): number {
    return line.product.id;
  }
}
