import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { StoryUserComponent } from './story-user/story-user.component';
import { TicketsComponent } from './tickets/tickets.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate:[authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'storyUsers/:id', component: StoryUserComponent, canActivate:[authGuard]},
    {path: 'tickets/:id', component: TicketsComponent, canActivate:[authGuard]},
    {path: '**', redirectTo: '/login'}
]