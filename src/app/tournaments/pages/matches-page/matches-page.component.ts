import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Match } from '../../interfaces/match.interfece';
import { PlayerInMatch } from '../../interfaces/player-in-match.interfece';
import { Player } from '../../interfaces/player.interfece';
import { MatchService } from '../../services/match.service';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
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
  playersTeam1: Player[] = [];
  playersTeam2: Player[] = [];
  showTeamControls: boolean = true;
  match: Match = {};
  private modalService = inject(NgbModal);
  closeResult = '';
  matchEvents: string[] = [];
  selectedTeamPlayers: Player[] = [];
  typeMatch: string = '';
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild('contentEvent') contentEvent!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private playerService: PlayerService,
    private http: HttpClient,
    private teamService: TeamService,
    private tournamentService: TournamentService,
  ) { }

  ngOnInit(): void {
    // Llama a la API para obtener los valores del enum
    this.http.get<string[]>('http://localhost:3000/player_in_match/match_event').subscribe((data) => {
      this.matchEvents = data;
    });

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

  public formMatch = new FormGroup({
    dateMatch: new FormControl('', [Validators.required]),
    field: new FormControl('', [Validators.required]),
    referee: new FormControl(''),
  });

  get currentMatch(): Match {
    const match = this.formMatch.value as Match;
    match.tournam = this.tournamId;
    match.localTeam = this.match.teams![0].teamId;
    match.visitingTeam = this.match.teams![1].teamId;
    match.typeMatch = this.typeMatch;
    return match;
  }

  public formEvent = new FormGroup({
    player: new FormControl('', [Validators.required]),
    matchEvent: new FormControl('', [Validators.required]),
  });

  get currentEvent(): PlayerInMatch {
    const event = this.formEvent.value as PlayerInMatch;
    event.match = this.match.id!;
    event.tournam = this.tournamId;
    return event;
  }

  addMatch(modal: any) {
    if (this.formMatch.invalid) {
      this.formMatch.markAllAsTouched();
      return;
    }
    this.matchService.createMatch(this.currentMatch).subscribe({
      next: (response) => {
        modal.close('Save click')
        this.onUpdate();
        this.showSuccessNotification('Partido creado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error, ' + error.error.message);
      }
    });
  }

  modalMatch(match: Match, typeMatch: string) {
    this.match = match;
    this.typeMatch = typeMatch;
    this.open(this.content)
  }

  modalEvent(match: Match, typeMatch: string) {
    this.match = match;
    this.typeMatch = typeMatch;
    const teamIa1: string = match.teams![0].teamId;
    const teamIa2: string = match.teams![1].teamId;
    this.teamService.getTeamById(teamIa1).subscribe((response) => {
      this.playersTeam1 = response?.players || [];
    });
    this.teamService.getTeamById(teamIa2).subscribe((response) => {
      this.playersTeam2 = response?.players || [];
    });
    this.open(this.contentEvent)
  }

  addEvent(modal: any) {
    if (this.formEvent.invalid) {
      this.formEvent.markAllAsTouched();
      return;
    }
    this.playerService.createPlayerInMatch(this.currentEvent).subscribe({
      next: (response) => {
        modal.close('Save click')
        this.formEvent.reset();
        this.onUpdate();
        this.showSuccessNotification('Evento creado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error al crear . ' + error.error.message);
      }
    });
  }

  endMatch(modal: any) {
    const match = { endMatch: true } as Match;
    const id: string = this.match.id!;
    this.matchService.updateMatch(id, match).subscribe({
      next: (response) => {
        modal.close('Save click')
        this.onUpdate();
        this.showSuccessNotification('Partido finalizado con éxito! ');
      },
      error: (error) => {
        console.log(error);
        this.showErrorNotification('Ocurrió un error, ' + error.error.message);
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

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
