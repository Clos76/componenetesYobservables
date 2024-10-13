import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'productos', component: ProductListComponent}, 
    {path: 'cart', component: CartComponent}, 
    {path: '**', redirectTo: ''}//redirect unknown to home
];
