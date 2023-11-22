import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match } from '../../interfaces/match.interfece';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent {

  isMatchCreated: Record<string, boolean> = {};
  selectedMatchups: any[] = [];
  @Input() tournamId: string = '';
  @Input() match: Match = {};
  @Input() typeMatch: string = '';
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalMatch: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalEvent: EventEmitter<any> = new EventEmitter<any>();

  onOpenMatch() {
    this.modalMatch.emit({ match: this.match, typeMatch: this.typeMatch });
  }

  onOpenEvent() {
    this.modalEvent.emit({ match: this.match, typeMatch: this.typeMatch });
  }

  getTeamLogo(team: any, teamNumber: number): string {
    if (team && team.logoPath) {
      return team.logoPath;
    } else {
      return `../../../../assets/teams/logo${teamNumber}.png`;
    }
  }

}
