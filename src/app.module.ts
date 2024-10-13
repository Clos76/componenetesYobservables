import { importProvidersFrom, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Route } from "@angular/router"; 
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { AppRoutingModule } from './app/app-routing.module';
import { CartComponent } from "./app/cart/cart.component";
import { ProductListComponent } from "./app/product-list/product-list.component";


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent , // Declare your components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure this is imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }