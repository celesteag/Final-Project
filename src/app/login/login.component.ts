import { Component, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = signal('');
  password = signal('');
  message: string = '';

  constructor(private authService: AuthService, private router: Router){}

  login(): void {

    setTimeout(()=> {
      this.validations();
    }, 5000);

    this.authService.login(this.email(), this.password()).subscribe(
      (r) => {
        this.authService.saveToken(r.token);
        this.router.navigate(['/protected']);
      },
      (error) => {
        alert('Credenciales inválidas')
        this.message = 'Error: ' + error.error.message;
      }
    );
  }

  validations(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email())) {
      this.message = 'Error: El email no es válido';
      return false;
    }

    if (this.password().length < 8) {
      this.message = 'Error: La contraseña debe tener al menos 8 caracteres';
      return false;
    }
    if (!/[A-Z]/.test(this.password())) {
      this.message = 'Error: La contraseña debe contener al menos una letra mayúscula';
      return false;
    }
    if (!/[a-z]/.test(this.password())) {
      this.message = 'Error: La contraseña debe contener al menos una letra minúscula';
      return false;
    }
    if (!/[0-9]/.test(this.password())) {
      this.message = 'Error: La contraseña debe contener al menos un número';
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.password())) {
      this.message = 'Error: La contraseña debe contener al menos un carácter especial';
      return false;
    }


    this.message = 'Usuario registrado exitosamente';
    return true;
  }
}