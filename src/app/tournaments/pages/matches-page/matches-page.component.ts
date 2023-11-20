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

  teamsQuarter: Team[] = [];
  teamsSemi: Team[] = [];
  tournamId: string = '';

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.tournamentService.getTournamentById(this.tournamId).subscribe((teamResponse) => {
        this.teamsQuarter = teamResponse?.teams || [];
        console.log(this.teamsQuarter);
        this.teamsSemi = this.teamsQuarter.slice(0, 2);
        console.log(this.teamsSemi);
      });
    });
  }

  editTeam(match: any) {
    // Aquí puedes implementar la lógica para editar los equipos en la `match-card`
    console.log('Editar equipos del partido:', match);
  }

}
