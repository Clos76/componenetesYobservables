import { HttpClient } from '@angular/common/http'; //importar para solicitudes http 
import { Component, OnInit } from '@angular/core';
import { Observable, map, filter } from 'rxjs'; //operadores de rxjs
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; //importar para habilitar el uso de httpclient
import { CartService } from '../cart.service';
import { RouterOutlet } from '@angular/router'; //importar para la navegacion
import { CartComponent } from '../cart/cart.component';
import { RouterModule } from '@angular/router'; //importar para habilitar la navegacion entre paginas




@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CartComponent, HttpClientModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})


// implementacion de al iniciar
export class ProductListComponent  implements OnInit{
  products: any[] = []; //crear array vacio para guardar productos del llamado
  itemCount: number = 0; // contador de articulos en el carrito

  private apiUrl = "https://fakestoreapi.com/products"; // api usado para hacer llamada http

  constructor(private http: HttpClient, private cartService: CartService){}  //constructor que injecta HTTPClient y CartService

  ngOnInit(): void { //metodo ejecutado al iniciar el componente
      this.fetchProducts().subscribe((data: any) => { //obtener prod de api
        this.products = data.map((product: any) => { //trasnformar los productos
          return{
            ...product,//copiar todas las propiedades del prod
            title: product.title.toUpperCase() // implementar el tituly en mayusculas
          };
        }).filter((product: any)=> !product.completed) //filtrar los producots completados
      })

      //subscribirse a los cambios en articulos de carrito
      this.cartService.getCartItemsObservable().subscribe(items => {
        this.itemCount = items.length;//actualizar el contador
      })

  }

  //metodo fetch para realizar la solicitud http 
  fetchProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl); //retorna todos los articulos de apiUrl
  }

 
//articulos de pagina addToCart
addToCart(product: any): void {
  this.cartService.addToCart(product) //usar servicio para agreagar a carrito
  console.log("Agregado al carrito: ",product);


}

}
