import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink] 
})
export class RegisterComponent {
  userForm:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private authService: AuthService, 
    private router: Router
  ){
      this.userForm = this.formulario.group({
        username: [''],
        email: [''],
        password: ['']
      })
    }

  registrarUsuario() {
    this.authService.register(this.userForm.value).subscribe({
      next: (result) => {
        console.log("Usuario registrado", result);
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        console.log("Error al registrar usuario",err);
      }
    })
    

  }
}
