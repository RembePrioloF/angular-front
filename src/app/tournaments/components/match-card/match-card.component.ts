import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Match } from '../../interfaces/match.interfece';
import { PlayerInMatch } from '../../interfaces/player-in-match.interfece';
import { Player } from '../../interfaces/player.interfece';
import { MatchService } from '../../services/match.service';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { TournamentService } from '../../services/tournament.service';

interface PlayerEvent {
  playerId: string;
  teamId: string;
  point: number;
}

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {

  team1 = '';
  team2 = '';
  /* index = 0;
  matchId = '';
  */
  isMatchCreated: Record<string, boolean> = {};
  selectedMatchups: any[] = [];
  playersTeam1: Player[] = [];
  playersTeam2: Player[] = [];
  showTeamControls: boolean = true;
  selectedTeamPlayers: Player[] = [];
  matchEvents: string[] = [];
  public showModal: boolean = false;
  playerGoals: PlayerEvent[] = [];
  @Input() tournamId: string = '';
  @Input() match: Match = {};
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('openMatch') openMatch!: TemplateRef<any>;

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
    /*
        this.route.params.subscribe(params => {
          this.tournamId = params['id'];
          this.tournamService.getTournamentById(this.tournamId).subscribe((response) => {
            this.fetchTournamentData(this.tournamId);
            response?.matchs.forEach((match) => {
              this.isMatchCreated[match.index] = true;
              this.matchId = match.id;
            });
          });
        }); */

  }

  getPlayerGoals(teamId: string): any[] {
    return this.playerGoals.filter((player) => player.teamId === teamId);
  }

  /* convertTeamGoalsToPlayerEvents(teamGoals: Record<string, number>): PlayerEvent[] {
    const playerEvents: PlayerEvent[] = [];
    Object.entries(teamGoals).forEach(([teamId, point]) => {
      playerEvents.push({
        playerId: '', // Puedes dejarlo en blanco si no es necesario
        teamId,
        point,
      });
    });
    return playerEvents;
  } */

  /*  processPlayerMatches(playerInMatches: any[]): Record<string, number> {
     const teamGoals: Record<string, number> = {};

     playerInMatches.forEach((item) => {
       if (item.matchEvent === 'gol marcado') {
         const teamId = item.player.team.teamId;
         teamGoals[teamId] = (teamGoals[teamId] || 0) + item.point;
       }
     });

     return teamGoals;
   } */

  /*  updateEventArray(eventArray: any[], playerId: string, item: any, teamId: string) {
     const playerIndex = eventArray.findIndex(
       (player) => player.playerId === playerId && player.teamId === teamId
     );
     if (playerIndex !== -1) {
       eventArray[playerIndex].point += item.point;
     } else {
       eventArray.push({
         playerId,
         teamId,
         point: item.point,
       });
     }
   } */

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
    match.tournam = this.tournamId;
    match.localTeam = this.team1;
    match.visitingTeam = this.team2;
    return match;
  }

  get currentEvent(): PlayerInMatch {
    const event = this.formEvent.value as PlayerInMatch;
    event.match = this.match.id!;
    event.tournam = this.tournamId;
    return event;
  }

  /* createMatchupsQuarter() {
    const matchups = [];
    if (this.teamsQuarter.length >= 8) {
      for (let i = 0; i < 8; i += 2) {
        const team1 = this.teamsQuarter[i];
        const team2 = this.teamsQuarter[i + 1];
        matchups.push({ team1, team2 });
      }
    }
    return matchups;
  } */

  /* createMatchupsSemi() {
    const matchups = [];
    if (this.teamsSemi.length >= 4) {
      for (let i = 0; i < 4; i += 2) {
        const team1 = this.teamsSemi[i];
        const team2 = this.teamsSemi[i + 1];
        matchups.push({ team1, team2 });
      }
    }
    return matchups;
  } */

  onOpenMatch() {
    this.team1 = this.match.teams![0].teamId;
    this.team2 = this.match.teams![1].teamId;
/* this.openMatch.
 */  }

  addMatch() {
    if (this.formMatch.invalid) {
      this.formMatch.markAllAsTouched();
      return;
    }
    this.matchService.createMatch(this.currentMatch).subscribe({
      next: (response) => {
        this.showModal = false;
        this.update.emit()
        this.showSuccessNotification('Partido creado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error, ' + error.error.message);
      }
    });
  }

  openEvent() {
    const teamIa1: string = this.match.teams![0].teamId;
    this.teamService.getTeamById(teamIa1).subscribe((response) => {
      this.playersTeam1 = response?.players || [];
    });
    const teamIa2: string = this.match.teams![1].teamId;
    this.teamService.getTeamById(teamIa2).subscribe((response) => {
      this.playersTeam2 = response?.players || [];
    });

    this.showModal = true;
  }

  addEvent() {
    if (this.formEvent.invalid) {
      this.formEvent.markAllAsTouched();
      return;
    }
    this.playerService.createPlayerInMatch(this.currentEvent).subscribe({
      next: (response) => {
        this.closeModal.nativeElement.click()
        this.formEvent.reset();
        this.update.emit()
        this.showSuccessNotification('Evento creado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error al crear . ' + error.error.message);
      }
    });
  }

  endMatch() {
    /* const goalsTeam1 = this.getPlayerGoals(this.selectedMatchups[0].team1.teamId).reduce((total, goal) => total + goal.point, 0);
    const goalsTeam2 = this.getPlayerGoals(this.selectedMatchups[0].team2.teamId).reduce((total, goal) => total + goal.point, 0);
    // Determinar el equipo ganador basado en los goles
    const win = goalsTeam1 > goalsTeam2 ? this.selectedMatchups[0].team1 : this.selectedMatchups[0].team2;
    this.teamsSemi = Array.isArray(win) ? win[0] : win;

    console.log(this.winner);
    // Mostrar el equipo que ha marcado más goles
    this.showSuccessNotification(`El equipo ganador es: ${this.winner.name} con ${Math.max(goalsTeam1, goalsTeam2)} goles.`);
   */
  }

  getTeamLogo(team: any, teamNumber: number): string {
    if (team && team.logoPath) {
      return team.logoPath;
    } else {
      return `../../../../assets/teams/logo${teamNumber}.png`;
    }
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
