import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] 
})

// crear componente al iniciar
export class CartComponent implements OnInit {


  cartItems: any[] = []; //inicializar articulos del array

  constructor(private cartService: CartService) {} //instancia de CartService injectada en el constructor

  ngOnInit(): void {
    
    //al iniciar el componente, se subscribe a los cambios del carrito
      this.cartService.getCartItemsObservable().subscribe(items => {
        this.cartItems = items; //actualiza cartItems con los elementos del carrito
    
      })
}

//metodo para agregar un producto al carrito
addToCart(product: any): void {
  this.cartService.addToCart(product)//llama al sservicio para agregar el producto
}


}