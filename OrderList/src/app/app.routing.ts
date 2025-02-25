import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { AddOrderComponent } from './order-add/order-add.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order-management', component: OrderListComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent },

];
