# Componentes Observables

Componentes y Observables
Este proyecto fue generado por Angular CLI versión 18.2.5.

Servidor de desarrollo
Ingresar ng serve para un dev servidor. Navega al url indicado o a http://localhost:4200/. La aplicación se cargará automáticamente si hay algún cambio.

Compilando
Ingresa ng build para crear el proyecto. Los artefactos del build serán guardados en el dist/ directorio.


Proyecto Angular Desarrollo de Componentes y Observables.
Descripción General
En este proyecto se utilizaron componentes de diferentes páginas para poder mostrar artículos de una tienda. Se implementaron llamados de HTTP para poder usar un API de una tienda en línea. Este proyecto consiste en la creación de una tienda en línea de diferentes artículos utilizando el framework de Angular y Observables de RxJS, que permiten al usuario explorar una lista de productos, agregarlos a un carrito de compras y se puede visualizar los artículos seleccionados junto con sus cantidades y precios totales. Se integra llamadas HTTP al API de https://fakestoreapi.com/products. Se utilizaron observables para la manipulación de datos, incluyendo el retorno de la descripción de los artículos de la tienda convertidos en mayúscula. Se crearon diferentes páginas como la de Home, Products, Cart las cuales el usuario puede navegar de una a otra. Se implementó un carrito en el cual se creó un observable que se suscribe al observador para cuando hubieran cambios al carrito se actualice el número de artículos en la sección de carrito y en la página del carrito. 

Características
**Visualización de productos** 
Se creó un componente llamado product-list.component.ts el cual contiene el código TypeScript. 

Al usar el llamado HTTP para el API http://fakestoreapi.com/products, se carga una lista de productos y muestra los productos en diferentes divs o secciones. 

En el componente product-list.component.html se creó una sección para el nombre del artículo, precio y la imagen. 

Observable con operador map. Los nombres de los productos son transformados a mayúsculas usando observable con un operador map. 

**Carrito de compras** 

Los productos pueden ser agregados al carrito de compra. 

Si un producto ya existe en el carrito, la cantidad se incrementa en lugar de duplicar el producto. 

Los artículos en el carrito muestran la cantidad de artículos seleccionados por si se escogió el mismo artículo más de una vez. 

El carrito de compra muestra el valor total por si se escoge más de un artículo. 

Se implementó el uso de error por si los datos ingresados no fueron ingresados correctamente y se imprime el error.

**Uso de observables y operadores** 

Se utilizaron observables para gestionar los datos del carrito en tiempo real, permitiendo que los cambios se reflejen dinámicamente. 

Operadores como map y filter se utilizan para manipular los datos antes de presentarlos como la filtración de productos completos o ajustando en nombre del artículo en mayúsculas. 

Se creó el constructor privado http que implementa el HttpClient.

En el método OnInit que es utilizado al usar el componente, se implementa el fetchDetails para obtener los resultados del API.

Se creó el método público fetchDetails el cual implementa un GET al API con el url obtenido, se suscribe y se regresa la respuesta.

Los elementos del carrito se muestran en tarjetas con estilos personalizados, como colores, efectos de hover y estilos para mejorar la experiencia del usuario. 

Se creó un CartService.service.ts en el cual se creó otro observable llamado getCartItemsObservable() que es inyectable y se puede llamar para ver los artículos en el carrito de compras. 

Se inyectó el CartService por medio de los constructores en product-list.component.ts y en cart.component.ts

Código de ejemplo
**cart.service.ts **
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = []; // Array para guardar artículos
  private cartItemsSubject = new BehaviorSubject<any[]>(this.items); // subject para emitir cambios en los artículos

  constructor() { } //constructor vacío

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

    // notificar a los suscriptores sobre el cambio en el carrito
    this.cartItemsSubject.next(this.items);
    console.log("Artículos en carrito: ", this.items); // mostrar artículos
  }

  // obtener artículos en el carrito
  getItems() {
    return this.items;
  }

  // método para exponer el observable de artículos del carrito 
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


Código de ejemplo
** product-list.component.ts**
import { HttpClient } from '@angular/common/http'; //importar para solicitudes http 
import { Component, OnInit } from '@angular/core';
import { Observable, map, filter } from 'rxjs'; //operadores de rxjs
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; //importar para habilitar el uso de httpclient
import { CartService } from '../cart.service';
import { RouterOutlet } from '@angular/router'; //importar para la navegación
import { CartComponent } from '../cart/cart.component';
import { RouterModule } from '@angular/router'; //importar para habilitar la navegación entre páginas


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartComponent, HttpClientModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})


// implementación de al iniciar
export class ProductListComponent  implements OnInit{
  products: any[] = []; //crear array vacio para guardar productos del llamado
  itemCount: number = 0; // contador de artículos en el carrito

  private apiUrl = "https://fakestoreapi.com/products"; // api usado para hacer llamada http

  constructor(private http: HttpClient, private cartService: CartService){}  //constructor que inyecta HTTPClient y CartService

  ngOnInit(): void { //metodo ejecutado al iniciar el componente
      this.fetchProducts().subscribe((data: any) => { //obtener prod de api
        this.products = data.map((product: any) => { //transformar los productos
          return{
            ...product,//copiar todas las propiedades del prod
            title: product.title.toUpperCase() // implementar el titulo en mayusculas
          };
        }).filter((product: any)=> !product.completed) //filtrar los productos completados
      })

      //suscribirse a los cambios en artículos de carrito
      this.cartService.getCartItemsObservable().subscribe(items => {
        this.itemCount = items.length;//actualizar el contador
      })

  }

  //método fetch para realizar la solicitud http 
  fetchProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl); //retorna todos los artículos de apiUr
  }

 
//artículos de pagina addToCart
addToCart(product: any): void {
  this.cartService.addToCart(product) //usar servicio para agregar a carrito
  console.log("Agregado al carrito: ",product);


}

}

Código de ejemplo
** cart.component.ts**

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


  cartItems: any[] = []; //inicializar artículos del array

  constructor(private cartService: CartService) {} //instancia de CartService inyectada en el constructor

  ngOnInit(): void {
    
    //al iniciar el componente, se subscribe a los cambios del carrito
      this.cartService.getCartItemsObservable().subscribe(items => {
        this.cartItems = items; //actualiza cartItems con los elementos del carrito
    
      })
}

//método para agregar un producto al carrito
addToCart(product: any): void {
  this.cartService.addToCart(product)//llama al servicio para agregar el producto
}


}


#Estructura del Proyecto /src /app /cart/cart.component.ts #Componente que muestra el carrito y sus artículos. 

#Estructura del Proyecto /src /app /product-list/product-list.component.ts # Componente que usa http para llamar al api y muestra los artículos


#Estructura del Proyecto /src /app /cart.service.ts # Este es la creación del injectable que tiene método getCartItemsObservable(), pone los artículos si no están en el carrito por medio de addToCart() y obtiene los artículos por medio de getItems(). 

