import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}


  
  login(form: NgForm) {
    if (form.valid) {
      const credentials = { email: this.username, password: this.password };
      this.authService.login(credentials).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/')
        },
        (error) => {
          alert('Credenciales incorrectas. Por favor verifica e intenta nuevamente.');
        }
      );
    } else {
      alert('No has completado los campos requeridos.');
    }
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register')
  }


}