import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../interfaces/team.interfece';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.css']
})
export class MatchesPageComponent implements OnInit {

  teams: Team[] = [];
  selectedTeams: any[] = [];

  constructor(
    private http: HttpClient,
    private teamService: TeamService,
  ) { }

  ngOnInit(): void {
    this.teamService.getTeam()
      .subscribe((teamResponse) => {
        this.teams = teamResponse;
      });
  }

  editTeam(match: any) {
    // Aquí puedes implementar la lógica para editar los equipos en la `match-card`
    console.log('Editar equipos del partido:', match);
  }

}
