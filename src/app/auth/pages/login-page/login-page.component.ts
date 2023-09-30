import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']

})
export class LoginPageComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin(): void {
    // Validar que el email y la contraseña no estén vacíos antes de iniciar sesión
    if (this.email.trim() === '' || this.password.trim() === '') {
      console.error('Por favor, ingrese un email y una contraseña válidos.');
      return; // Detener el proceso si falta información
    }
    // Llamar al servicio de autenticación para realizar la solicitud de inicio de sesión
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        // La autenticación fue exitosa, redirigir al usuario a la página principal u otra página deseada.
        this.router.navigate(['/tournaments/tournament']);
      },
      error: (error) => {
        // Ocurrió un error durante la autenticación, puedes mostrar un mensaje de error al usuario.
        console.error('Error de inicio de sesión:', error);
        // Aquí puedes mostrar un mensaje de error al usuario, como un toast o una notificación.
      },
    });
  }

}
