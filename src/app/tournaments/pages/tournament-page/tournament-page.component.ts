import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from '../../interfaces/tournament.interfece';

@Component({
  selector: 'tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent {

  public tournaments: Tournament[] = [];

  constructor(
    private router: Router,
  ) { }

  newTournam() {
    this.router.navigateByUrl('/tournaments/new-tournam');
  }

}
