import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 
import { ProductosComponent } from './pages/cliente/productos/productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CheckoutComponent } from './pages/cliente/checkoutP/checkout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },     
  { path: 'productos', component: ProductosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'checkout', component: CheckoutComponent }
];
