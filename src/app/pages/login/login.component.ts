import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink] 
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router
            ) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (result) => {
        this.tokenService.setToken(result.token);
        this.router.navigate(['tareas']);
      },
      error: (err) => {
        console.error("Fallo al iniciar sesion: ",err);
      }
    });
  }

}
