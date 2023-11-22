import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Tournament } from '../interfaces/tournament.interfece';

@Injectable({ providedIn: 'root' })
export class TournamentService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  createTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(`${this.baseUrl}/tournam`, tournament);
  }

  getTournament(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.baseUrl}/tournam`)
  }

  getTournamentById(id: string): Observable<Tournament | undefined> {
    return this.http.get<Tournament>(`${this.baseUrl}/tournam/${id}`)
      .pipe(catchError(e => of(undefined)));
  }

  getTournamentMatchById(id: string): Observable<Tournament | undefined> {
    return this.http.get<Tournament>(`${this.baseUrl}/tournam/match/${id}`)
      .pipe(catchError(e => of(undefined)));
  }

}
