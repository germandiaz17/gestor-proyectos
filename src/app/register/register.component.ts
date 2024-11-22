import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CompaniesService } from '../services/companies.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  companies: any[] = [];
  selectedCompanyId: number | null = null;

  constructor(private router: Router ,private authService: AuthService, private companyService: CompaniesService) {}

  ngOnInit() {
    this.loadCompanies()
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error loading companies:', error);
      }
    );
  }



  register(form: NgForm) {
    if (form.valid) {
      const userRegister = {name:this.name, email: this.email, password: this.password, companyId: this.selectedCompanyId };
      this.authService.register(userRegister).subscribe(
        (response) => {
          this.router.navigateByUrl('/login')
        },
        (error) => {
          alert('Error al intentar registrar un nuevo usuario');
        }
      );
    } else {
      alert('No has completado los campos requeridos.');
    }
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login')
  }

}
