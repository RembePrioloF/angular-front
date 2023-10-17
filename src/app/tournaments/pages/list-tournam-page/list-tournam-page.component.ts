import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Tournament } from '../../interfaces/tournament.interfece';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'list-tournam-page',
  templateUrl: './list-tournam-page.component.html',
  styleUrls: ['./list-tournam-page.component.css']

})
export class ListTournamPageComponent implements OnInit {

  public tournaments: Tournament[] = [];

  constructor(
    private tournamentService: TournamentService,
  ) { }

  ngOnInit(): void {
    this.tournamentService.getTournament()
      .subscribe(response =>
        this.tournaments = response
      );
  }

}
