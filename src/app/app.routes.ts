import { Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { ProtectedComponent } from './protected/protected.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'persons', component: PersonComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'protected', component: ProtectedComponent },
    { path: '**', redirectTo: '' }
];

