import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = []; // Array para guardar articulos
  private cartItemsSubject = new BehaviorSubject<any[]>(this.items); // subject para emitir cambios en los articulos

  constructor() { } //constructor vacio

  // agregar productos al carrito
  addToCart(product: any) {
    // verificar si el producto ya existe
    const existingProduct = this.items.find(item => item.id === product.id);

    if (existingProduct) {
      // si existe, incrementar la cantidad
      existingProduct.quantity += 1;
    } else {
      // si no existe, agregarlo al carrito con cantidad 
      this.items.push({ ...product, quantity: 1 });
    }

    // notificar a los subscriptores sobre el cambio en el carrito
    this.cartItemsSubject.next(this.items);
    console.log("Articulos en carrito: ", this.items); // mostrar articulos
  }

  // obtener articulos en el carrito
  getItems() {
    return this.items;
  }

  // metodo para exponer el observable de articulos del carrito 
  getCartItemsObservable() {
    return this.cartItemsSubject.asObservable(); // Return the observable
  }

  // limpia carrito
  clearCart() {
    this.items = [];
    this.cartItemsSubject.next(this.items); // Notify subscribers
    return this.items;
  }
}