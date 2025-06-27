import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 
import { ProductosComponent } from './pages/cliente/productos/productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CheckoutComponent } from './pages/cliente/checkoutP/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' }, 
  { path: 'Login', component: LoginComponent },     
  { path: 'productos', component: ProductosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'checkout', component: CheckoutComponent }
];
