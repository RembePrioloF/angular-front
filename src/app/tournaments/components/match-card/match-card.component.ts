import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../interfaces/team.interfece';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {

  public teams: Team[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

  }

  addTeamL() {
    console.log('addTeamL');
  }

  addTeamV() {
    console.log('addTeamV');
  }

  onCellClick(team: Team) {
    console.log(team.name);
  }

}
