import { Component, Input } from '@angular/core';
import { Team } from '../../interfaces/team.interfece';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent {

  @Input() teams: Team[] = [];
  selectedMatchups: any[] = [];

  constructor() { }

  createMatchups() {
    const matchups = [];
    for (let i = 0; i < 8; i += 2) {
      const team1 = this.teams[i];
      const team2 = this.teams[i + 1];
      matchups.push({ team1, team2 });
    }
    return matchups;
  }

  openMatch(i: number) {
    const matchups = this.createMatchups();
    if (i >= 0 && i < matchups.length) {
      this.selectedMatchups = [matchups[i]];
    }
  }

}
