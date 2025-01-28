import { Routes, Route } from '@angular/router';
import { ProductsPage } from './pages/products.page';
import { CartPage } from './pages/cart.page';
import { DetailsPage } from './pages/details.page';
import { ProductsFavoritesPage } from './pages/products-favorites.page';
import { CartButtonComponent } from './components/cart-button.component';

interface RouteInfo {
    route: Route;
    exact: boolean;
    showInNav: boolean;
    iconClass?: string;
    specilaComponent?: any;
}

export const routesInfo: RouteInfo[] = [
    {
        route: {
            path: '',
            title: 'Home',
            component: ProductsPage
        },
        exact: true,
        showInNav: true,
        iconClass: 'fa fa-home'
    },
    {
        route: {
            path: 'products',
            title: 'Products',
            component: ProductsPage
        },
        exact: false,
        showInNav: true,
    },
    {
        route: {
            path: 'favorites',
            title: 'Favorites',
            component: ProductsFavoritesPage
        },
        exact: true,
        showInNav: true,
        iconClass: 'fa fa-heart'
    },
    {
        route: {
            path: 'cart',
            title: 'Cart',
            component: CartPage
        },
        exact: true,
        showInNav: false,
        iconClass: 'fa fa-shopping-cart',
        specilaComponent: CartButtonComponent,
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
