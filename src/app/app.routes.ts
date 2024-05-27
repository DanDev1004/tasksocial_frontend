import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { LoginComponent } from './pages/login/login.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'tareas', component: TareaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },
  { path: '**', redirectTo: 'tareas' },
];
