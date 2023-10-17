import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
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

  onRegister(): void {
    // Crea un objeto con los datos del usuario a registrar
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };
    this.authService.register(newUser)
      .subscribe({
        next: (response) => {
          // El registro fue exitoso, puedes redirigir al usuario o mostrar un mensaje de éxito.
          console.log('Registro exitoso:', response);
          // Redirige al usuario a la página de inicio de sesión u otra página deseada.
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          // Ocurrió un error durante el registro, muestra un mensaje de error al usuario.
          console.error('Error de registro:', error);
          // Puedes mostrar un mensaje de error al usuario, como un toast o una notificación.
        }
      });
  }

}
