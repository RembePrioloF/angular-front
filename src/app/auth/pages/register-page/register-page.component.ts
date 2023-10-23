import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interfece';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // Llama a la API para obtener los valores del enum
    this.http.get<string[]>('http://localhost:3000/auth/roles').subscribe((data) => {
      this.roles = data;
    });
  }

  public formUser = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('', [Validators.required]),
  });

  get currentUser(): User {
    const user = this.formUser.value as User;
    return user;
  }

  onRegister(): void {
    if (this.formUser.invalid) {
      this.formUser.markAllAsTouched();
      return;
    }
    this.authService.register(this.currentUser)
      .subscribe({
        next: (response) => {
          // El registro fue exitoso, puedes redirigir al usuario o mostrar un mensaje de éxito.
          this.showSuccessNotification('Registro exitoso: ')
          // Redirige al usuario a la página de inicio de sesión u otra página deseada.
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          // Ocurrió un error durante el registro, muestra un mensaje de error al usuario.
          this.showErrorNotification('Error de registro: ' + error.error.message)
          console.error('Error de registro:', error);
          // Puedes mostrar un mensaje de error al usuario, como un toast o una notificación.
        }
      });
  }

  isInvalid(fieldName: string): boolean {
    const control = this.formUser.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  private showSuccessNotification(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
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
