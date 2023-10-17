import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, catchError } from 'rxjs';
import { Tournament } from '../interfaces/tournament.interfece';

@Injectable({ providedIn: 'root' })
export class TournamentService {

  private baseUrl: string  = environments.baseUrl;

  constructor(private http: HttpClient) { }

  createTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(`${this.baseUrl}/tournam`, tournament);
  }

  getTournament(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.baseUrl}/tournam`)
  }

}
