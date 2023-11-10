import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Match } from '../../interfaces/match.interfece';
import { PlayerInMatch } from '../../interfaces/player-in-match.interfece';
import { Player } from '../../interfaces/player.interfece';
import { Team } from '../../interfaces/team.interfece';
import { MatchService } from '../../services/match.service';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {

  index = 0;
  team1 = '';
  team2 = '';
  matchId = '';
  tournamId: string = '';
  @Input() teams: Team[] = [];
  isMatchCreated: Record<string, boolean> = {};
  selectedMatchups: any[] = [];
  playersTeam1: Player[] = [];
  playersTeam2: Player[] = [];
  matchEvents: string[] = [];

  constructor(
    private tournamService: TournamentService,
    private matchService: MatchService,
    private playerService: PlayerService,
    private teamService: TeamService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Llama a la API para obtener los valores del enum
    this.http.get<string[]>('http://localhost:3000/player_in_match/match_event').subscribe((data) => {
      this.matchEvents = data;
    });

    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.tournamService.getTournamentById(this.tournamId).subscribe((response) => {
        response?.matchs.forEach((match) => {
          this.isMatchCreated[match.index] = true;
          this.matchId = match.id;
        });
      });
    });

  }

  public formMatch = new FormGroup({
    dateMatch: new FormControl('', [Validators.required]),
    field: new FormControl('', [Validators.required]),
    referee: new FormControl(''),
  });

  public formEvent = new FormGroup({
    player: new FormControl('', [Validators.required]),
    matchEvent: new FormControl('', [Validators.required]),
  });

  get currentMatch(): Match {
    const match = this.formMatch.value as Match;
    match.index = this.index;
    match.tournam = this.tournamId;
    match.localTeam = this.team1;
    match.visitingTeam = this.team2;
    return match;
  }

  get currentEvent(): PlayerInMatch {
    const event = this.formEvent.value as PlayerInMatch;
    event.match = this.matchId;
    console.log(event);

    return event;
  }

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
    this.index = i;
    const matchups = this.createMatchups();
    if (i >= 0 && i < matchups.length) {
      this.selectedMatchups = [matchups[i]];
      this.team1 = this.selectedMatchups[0].team1.teamId;
      this.team2 = this.selectedMatchups[0].team2.teamId;
    }
  }

  addMatch() {
    if (this.formMatch.invalid) {
      this.formMatch.markAllAsTouched();
      return;
    }
    this.matchService.createMatch(this.currentMatch).subscribe({
      next: (response) => {
        this.isMatchCreated[this.index] = true;
        this.showSuccessNotification('Partido creado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error, ' + error.error.message);
      }
    });
  }

  openEvent(i: number) {
    const matchups = this.createMatchups();
    if (i >= 0 && i < matchups.length) {
      this.selectedMatchups = [matchups[i]];
      const teamIa1: string = this.selectedMatchups[0].team1.teamId;
      this.teamService.getTeamById(teamIa1)
        .subscribe((response) => {
          this.playersTeam1 = response?.players || [];
        });
      const teamIa2: string = this.selectedMatchups[0].team2.teamId;
      this.teamService.getTeamById(teamIa2)
        .subscribe((response) => {
          this.playersTeam2 = response?.players || [];
        });
    }
  }

  addEvent() {
    if (this.formEvent.invalid) {
      this.formEvent.markAllAsTouched();
      return;
    }
    this.playerService.createPlayerInMatch(this.currentEvent).subscribe({
      next: (response) => {
        this.showSuccessNotification('Evento creado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error al crear . ' + error.error.message);
      }
    });
  }

  isInvalidFormMatch(fieldName: string): boolean {
    const control = this.formMatch.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  isInvalidformEvent(fieldName: string): boolean {
    const control = this.formEvent.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  private showSuccessNotification(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  }

  private showErrorNotification(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

}
