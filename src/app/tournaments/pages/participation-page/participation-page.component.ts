import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Team } from '../../interfaces/team.interfece';
import { TeamService } from '../../services/team.service';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-participation-page',
  templateUrl: './participation-page.component.html',
  styleUrls: ['./participation-page.component.css']
})
export class ParticipationPageComponent implements OnInit {

  tournamId: string = '';
  public teams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private tournamService: TournamentService,
    private route: ActivatedRoute,
  ) { }

  public formTeam = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    coach: new FormControl('', []),
    logo: new FormControl('', []),
  });

  get currentTeam(): Team {
    const team = this.formTeam.value as Team;
    team.tournam = this.tournamId;
    return team;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.tournamService.getTournamentById(this.tournamId)
        .subscribe((response) => {
          this.teams = response?.teams || [];
        });
    });

    this.formTeam.reset();
  }

  onSubmit() {
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
          this.showErrorNotification('An error occurred while creating the team. ' + error.error.message);
        }
      });
  }

  editTeam() {
    console.log('clic');
  }

  isInvalid(fieldName: string): boolean {
    const control = this.formTeam.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  private showErrorNotification(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

}
