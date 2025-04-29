import { Component, signal } from '@angular/core';
import { PersonComponent } from '../person/person.component';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.css'
})
export class ProtectedComponent {

  isAuthenticated = false;
  texto = signal("");

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.getToken
    this.isAuthenticated = this.authService.getToken();
    if (!this.isAuthenticated){
      this.router.navigate(['/login'])
    }

    this.authService.protected().subscribe((r) => {
      alert(this.texto.set(r.texto()));
    });
    this.router.navigate(['/persons'])
  }
}


