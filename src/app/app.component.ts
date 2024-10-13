import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root', //pagina inicial 
  standalone: true,
  imports: [RouterOutlet,
     CommonModule, HttpClientModule, RouterModule, HomeComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'componentesObservables';
}

