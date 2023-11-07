import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Match } from '../interfaces/match.interfece';
import { Tournament } from '../interfaces/tournament.interfece';

@Injectable({ providedIn: 'root' })
export class MatchService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.baseUrl}/match`, match);
  }

  getMatch(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/match`)
  }

  getTournamentById(id: string): Observable<Tournament | undefined> {
    return this.http.get<Tournament>(`${this.baseUrl}/tournam/${id}`)
      .pipe(catchError(e => of(undefined)));
  }

}
