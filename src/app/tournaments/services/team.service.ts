import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Team } from '../interfaces/team.interfece';

@Injectable({ providedIn: 'root' })
export class TeamService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/team`, team);
  }

  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/team`)
  }

  getTeamById(id: string): Observable<Team | undefined> {
    return this.http.get<Team>(`${this.baseUrl}/team/${id}`)
      .pipe(catchError(e => of(undefined)));
  }

}
