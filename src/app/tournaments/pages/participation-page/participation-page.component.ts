import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Player } from '../../interfaces/player.interfece';
import { Team } from '../../interfaces/team.interfece';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-participation-page',
  templateUrl: './participation-page.component.html',
  styleUrls: ['./participation-page.component.css']
})
export class ParticipationPageComponent implements OnInit {

  tournamId: string = '';
  teamId: string = '';
  teamIName: string = '';
  public teams: Team[] = [];
  public positions: string[] = [];
  public players: Player[] = [];
  teamPlayersCount: { [teamId: string]: number } = {};

  constructor(
    private tournamService: TournamentService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  public formTeam = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    coach: new FormControl('', []),
    logo: new FormControl('', []),
  });

  public formPlayer = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    playerNumber: new FormControl(0, [Validators.required]),
    position: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    isCaptain: new FormControl(false, []),
  });

  get currentTeam(): Team {
    const team = this.formTeam.value as Team;
    team.tournam = this.tournamId;
    return team;
  }

  get currentPlayer(): Player {
    const player = this.formPlayer.value as Player;
    player.team = this.teamId;
    return player;
  }

  ngOnInit(): void {
    // Llama a la API para obtener los valores del enum
    this.http.get<string[]>('http://localhost:3000/player/positions').subscribe((data) => {
      this.positions = data;
    });

    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.tournamService.getTournamentById(this.tournamId).subscribe((response) => {
        this.teams = response?.teams || [];
        this.teams.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        this.openPlayer(this.teamId);
        this.teams.forEach((team) => {
          this.teamService.getTeamById(team.teamId).subscribe((teamResponse) => {
            this.teamPlayersCount[team.teamId] = teamResponse?.players.length || 0;
          });
        });
      });
    });

    this.formTeam.reset();
    this.formPlayer.reset();
  }

  addTeam() {
    if (this.formTeam.invalid) {
      this.formTeam.markAllAsTouched();
      return;
    }
    this.teamService.createTeam(this.currentTeam)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
          this.showErrorNotification('' + error.error.message);
        }
      });
  }

  addPlayers() {
    if (this.formPlayer.invalid) {
      this.formPlayer.markAllAsTouched();
      return;
    }
    if (!this.formPlayer.value.isCaptain) {
      this.formPlayer.value.isCaptain = false
    }
    this.playerService.createPlayer(this.currentPlayer)
      .subscribe({
        next: (response) => {
          this.showSuccessNotification('Jugador creado con éxito! ' + response.name);
        },
        error: (error) => {
          console.log(error);
          this.showErrorNotification('' + error.error.message);
        }
      });
  }

  openPlayer(id: string) {
    this.teamId = id;
    this.teamService.getTeamById(id).subscribe((response) => {
      this.teamIName = response?.name as string;
      this.players = response?.players || [];
      this.players.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    });
  }

  editTeam() {
    console.log('clic');
  }

  isInvalidTeam(fieldName: string): boolean {
    const control = this.formTeam.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  isInvalidPlayer(fieldName: string): boolean {
    const control = this.formPlayer.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  private showSuccessNotification(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
    this.ngOnInit();
  }

  private showErrorNotification(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

}
