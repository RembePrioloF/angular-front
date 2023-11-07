import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Match } from '../../interfaces/match.interfece';
import { Team } from '../../interfaces/team.interfece';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css']
})
export class MatchCardComponent implements OnInit {

  @Input() teams: Team[] = [];
  selectedMatchups: any[] = [];
  team1 = '';
  team2 = '';
  isMatchCreated: Record<string, boolean> = {};
  index = 0;

  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.matchService.getMatch()
      .subscribe((response) => {
        response.forEach((match) => {
          console.log(match.index);
          this.isMatchCreated[match.index] = true;
        });
      });
  }

  public formMatch = new FormGroup({
    dateMatch: new FormControl('', [Validators.required]),
    field: new FormControl('', [Validators.required]),
    referee: new FormControl(''),
  });

  get currentMatch(): Match {
    const match = this.formMatch.value as Match;
    match.index = this.index;
    match.localTeam = this.team1;
    match.visitingTeam = this.team2;
    return match;
  }

  addMatch() {
    if (this.formMatch.invalid) {
      this.formMatch.markAllAsTouched();
      return;
    }
    this.matchService.createMatch(this.currentMatch)
      .subscribe({
        next: (response) => {
          this.isMatchCreated[this.index] = true;
          this.showSuccessNotification('Partido creado con éxito! ');
        },
        error: (error) => {
          console.log(error);
          this.showErrorNotification('Ocurrió un error al crear . ' + error.error.message);
        }
      });
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

  openEvent(i: number) {

    console.log(i);

  }

  isInvalid(fieldName: string): boolean {
    const control = this.formMatch.get(fieldName) as FormControl;
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
