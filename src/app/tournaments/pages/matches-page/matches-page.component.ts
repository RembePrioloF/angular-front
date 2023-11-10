import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../interfaces/team.interfece';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.css']
})
export class MatchesPageComponent implements OnInit {

  teams: Team[] = [];
  tournamId: string = '';
  selectedTeams: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.tournamentService.getTournamentById(this.tournamId)
        .subscribe((teamResponse) => {
          this.teams = teamResponse?.teams || [];
        });
    });
  }

  editTeam(match: any) {
    // Aquí puedes implementar la lógica para editar los equipos en la `match-card`
    console.log('Editar equipos del partido:', match);
  }

}
