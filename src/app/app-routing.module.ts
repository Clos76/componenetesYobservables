import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';

// Define the routes for the application
const routes: Routes = [
  { path: '', component: ProductListComponent }, // main page for product list
  { path: 'cart', component: CartComponent } // cart page
];

@NgModule({
  imports: [
     
    RouterModule.forRoot(routes) // Correctly use forRoot to register routes
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }