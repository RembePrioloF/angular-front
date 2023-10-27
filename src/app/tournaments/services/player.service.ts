import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Team } from '../interfaces/team.interfece';
import { Player } from '../interfaces/player.interfece';

@Injectable({ providedIn: 'root' })
export class PlayerService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/player`, player);
  }

  getPlayer(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/player`)
  }

  getPlayerById(id: string): Observable<Player | undefined> {
    return this.http.get<Player>(`${this.baseUrl}/player/${id}`)
      .pipe(catchError(e => of(undefined)));
  }

}
