import { Component, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email = signal('');
  password = signal('');
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {

    if (!this.validations()) {
      setTimeout(() => {
      this.message = '';
      }, 5000);
    return;
  }

    this.authService.register(this.email(), this.password()).subscribe(
      () => {
        this.message = "Usuario registrado";
        this.router.navigate(['/login']);
      },
      (error) => {
        this.message = "Error: " + error.error.message;
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

