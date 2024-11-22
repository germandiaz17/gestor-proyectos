import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { StoryUserService } from '../services/story-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story-user',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './story-user.component.html'
})
export class StoryUserComponent {

  stories: any[] = []
  projectId!: string
  newStoryName: string = ''

  constructor(
    private route: ActivatedRoute,
    private storiesUserService: StoryUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectId = String(this.route.snapshot.paramMap.get('id'));
    this.loadStories(this.projectId);
  }

  loadStories(projectId: string) {
    this.storiesUserService.getStories(projectId).subscribe(
      (data) => {
        this.stories = data;
      },
      (error) => {
        console.error('Error loading stories:', error);
      }
    );
  }

  newRegisterStoryUser(form: NgForm) {
    if (form.valid) {
      const storyRegister = {name:this.newStoryName, project_id: parseInt(this.projectId)};
      this.storiesUserService.newStoriUser(storyRegister).subscribe(
        (response) => {
          alert('historia de usuario registrada con exito')
          this.newStoryName = ''
        },
        (error) => {
          alert('Error al intentar registrar una nueva historia de usuario');
        }
      );
    } else {
      alert('No has completado los campos requeridos.');
    }
  }

  selectStori(storie:any) {
    this.router.navigate(['/tickets', storie.id]);
  }
}

