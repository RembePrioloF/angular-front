import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

interface PlayerEvent {
  playerId: string;
  playerName: string;
  teamName: string;
  point: number;
}

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {

  playerGoals: PlayerEvent[] = [];
  redCard: PlayerEvent[] = [];
  yellowCard: PlayerEvent[] = [];
  blueCard: PlayerEvent[] = [];

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {

    this.playerService.getPlayerInMatch()
      .subscribe((response) => {
        if (Array.isArray(response)) {
          response.forEach(item => {
            this.handleEvent(item);
          });
        }
      });

  }

  handleEvent(item: any) {
    const playerId = item.player.playerId;

    switch (item.matchEvent) {
      case 'gol marcado':
        this.updateEventArray(this.playerGoals, playerId, item);
        break;
      case 'tarjeta roja':
        this.updateEventArray(this.redCard, playerId, item);
        break;
      case 'tarjeta amarilla':
        this.updateEventArray(this.yellowCard, playerId, item);
        break;
      case 'tarjeta azul':
        this.updateEventArray(this.blueCard, playerId, item);
        break;
    }
  }

  updateEventArray(eventArray: any[], playerId: string, item: any) {
    const playerIndex = eventArray.findIndex(player => player.playerId === playerId);
    if (playerIndex !== -1) {
      eventArray[playerIndex].point += item.point;
    } else {
      eventArray.push({
        playerId,
        playerName: item.player.name,
        teamName: item.player.team.name,
        point: item.point
      });
    }
  }

}
