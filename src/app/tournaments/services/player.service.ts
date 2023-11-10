import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments';
import { PlayerInMatch } from '../interfaces/player-in-match.interfece';
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

  getPlayerInMatch(): Observable<PlayerInMatch | undefined> {
    return this.http.get<PlayerInMatch>(`${this.baseUrl}/player_in_match`)
      .pipe(catchError(e => of(undefined)));
  }

  createPlayerInMatch(player: PlayerInMatch): Observable<PlayerInMatch> {
    return this.http.post<PlayerInMatch>(`${this.baseUrl}/player_in_match`, player);
  }

}
