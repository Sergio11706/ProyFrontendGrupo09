import { Routes } from '@angular/router';
import { LoginComponent } from './components/Vista-Login-Google/login/login.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'Login', component: LoginComponent }
];
