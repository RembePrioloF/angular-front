import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interfece';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']

})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public formUser = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  get currentUser(): User {
    const user = this.formUser.value as User;
    return user;
  }

  onLogin(): void {
    // Validar que el email y la contraseña no estén vacíos antes de iniciar sesión
    if (this.currentUser.email.trim() === '' || this.currentUser.password.trim() === '') {
      this.showErrorNotification('Por favor, ingrese un email y una contraseña válidos.')
      console.error('Por favor, ingrese un email y una contraseña válidos.');
      return; // Detener el proceso si falta información
    }
    // Llamar al servicio de autenticación para realizar la solicitud de inicio de sesión
    this.authService.login(this.currentUser.email, this.currentUser.password).subscribe({
      next: (user) => {
        // La autenticación fue exitosa, redirigir al usuario a la página principal u otra página deseada.
        this.router.navigate(['/tournaments/tournament']);
      },
      error: (error) => {
        // Ocurrió un error durante la autenticación, puedes mostrar un mensaje de error al usuario.
        this.showErrorNotification('Error de inicio de sesión: ' + error.error.message)
        console.error('Error de inicio de sesión:', error);
        // Aquí puedes mostrar un mensaje de error al usuario, como un toast o una notificación.
      },
    });
  }

  private showErrorNotification(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

}
