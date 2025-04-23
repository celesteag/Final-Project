import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProtectedComponent } from './protected/protected.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'products', component: ProductComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'protected', component: ProtectedComponent },
    { path: '**', redirectTo: '' }
];

