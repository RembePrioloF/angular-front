import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../../interfaces/match.interfece';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.css']
})
export class MatchesPageComponent implements OnInit {

  matchQuarter: Match[] = [];
  matchSemi: Match[] = [];
  matchFinal: Match[] = [];
  tournamId: string = '';

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.onUpdate();
    });
  }

  onUpdate() {
    this.tournamentService.getTournamentMatchById(this.tournamId).subscribe((teamResponse) => {
      const resp = teamResponse as any
      this.matchQuarter = resp?.matchQuarter
      this.matchSemi = resp?.matchSemi
      this.matchFinal = resp?.matchFinal
    });
  }

  editTeam(match: any) {
    // Aquí puedes implementar la lógica para editar los equipos en la `match-card`
    console.log('Editar equipos del partido:', match);
  }

}
