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
  public userId: string = '';

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica el token JWT para obtener el ID del usuario
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.id;
    }
    return null;
  }

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
    return this.http.post<User>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
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

  getUserById(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.baseUrl}/auth/${id}`)
      .pipe(catchError(e => of(undefined)));
  }

}
