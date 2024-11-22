import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'
import { ProyectsService } from '../services/proyects.service';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  projects: any[] = [];

  constructor(private router: Router, private projectsService: ProyectsService) {}

  ngOnInit() {
    this.loadProjects()
  }
// listar los proyectos
  loadProjects() {
    this.projectsService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

// seleccionar un proyecto
  selectProject(project:any) {
    this.router.navigate(['/storyUsers', project.id]);
  }


// VERIFICACIONES
  userloginVerfication() {
    const username = localStorage.getItem('token');

    if(!username) {
      this.router.navigate(['/login'])
    }
  };

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  };
};
