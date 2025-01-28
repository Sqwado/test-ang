import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products.page';
import { CartPage } from './pages/cart.page';
import { DetailsPage } from './pages/details.page';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: ProductsPage
    },
    {
        path: 'products',
        title: 'Products',
        component: ProductsPage
    },
    {
        path: 'products/:id',
        title: 'Details',
        component: DetailsPage
    },
    {
        path: 'cart',
        title: 'Cart',
        component: CartPage
    }
];
