import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../interfaces/team.interfece';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {

  @Input()
  public teams: Team[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // Llama a la API para obtener los valores del enum
    this.http.get<Team[]>('http://localhost:3000/team').subscribe((data) => {
      this.teams = data;
      console.log(this.teams);
    });
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
