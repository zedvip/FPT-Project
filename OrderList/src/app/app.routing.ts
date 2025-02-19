import { Routes } from '@angular/router';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { AddOrderComponent } from './order-add/order-add.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'order-list', pathMatch: 'full' },
   { path: 'order-list', component: OrderListComponent },
  { path: 'add-order', component: AddOrderComponent },
];
