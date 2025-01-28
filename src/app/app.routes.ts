import { Routes, Route } from '@angular/router';
import { ProductsPage } from './pages/products.page';
import { CartPage } from './pages/cart.page';
import { DetailsPage } from './pages/details.page';
import { ProductsFavoritesPage } from './pages/products-favorites.page';

interface RouteInfo {
    route: Route;
    exact: boolean;
    showInNav: boolean;
}

export const routesInfo: RouteInfo[] = [
    {
        route: {
            path: '',
            title: 'Home',
            component: ProductsPage
        },
        exact: true,
        showInNav: true
    },
    {
        route: {
            path: 'products',
            title: 'Products',
            component: ProductsPage
        },
        exact: false,
        showInNav: true
    },
    {
        route: {
            path: 'favorites',
            title: 'Favorites',
            component: ProductsFavoritesPage
        },
        exact: true,
        showInNav: true
    },
    {
        route: {
            path: 'cart',
            title: 'Cart',
            component: CartPage
        },
        exact: true,
        showInNav: true
    },
    {
        route: {
            path: 'products/:id',
            title: 'Details',
            component: DetailsPage
        },
        exact: true,
        showInNav: false
    }
];

export const routes: Routes = routesInfo.map(r => r.route);
