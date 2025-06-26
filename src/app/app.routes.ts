import { Routes } from '@angular/router';
import { LoginComponent } from './components/Vista-Login-Google/login/login.component'; // o el de master si ya migraste componentes
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' }, // o redirigir a home si preferís eso
  { path: 'Login', component: LoginComponent },           // ajustá si hay conflicto con 'login'
  { path: 'productos', component: ProductosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'checkout', component: CheckoutComponent }
];
