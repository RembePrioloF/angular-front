import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interfece';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  register(user: any): Observable<any> {
    const registerUrl = `${this.baseUrl}/auth/register`;
    return this.http.post(registerUrl, user);
  }

  login(email: string, password: string): Observable<User> {
    // Construye un objeto de credenciales para enviar al servidor
    const credentials = { email, password };
    return this.http.post<User>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((user) => {
        // Almacena el token en el almacenamiento local o en las cookies
        if (user && user.token) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/auth/`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
