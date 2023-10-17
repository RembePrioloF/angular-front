import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Tournament } from '../../interfaces/tournament.interfece';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'new-tournam-page',
  templateUrl: './new-tournam-page.component.html',
  styleUrls: ['./new-tournam-page.component.css']

})
export class NewTournamPageComponent implements OnInit {

  public league: string[] = [];
  startDateErrorMessage: string = '';
  endDateErrorMessage: string = '';

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // Llama a la API para obtener los valores del enum
    this.http.get<string[]>('http://localhost:3000/tournam/league').subscribe((data) => {
      this.league = data;
    });
  }

  public formTournam = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    startDate: new FormControl('', [Validators.required], this.validateStartDate()),
    endDate: new FormControl(null, [], this.validateEndDate()),
    location: new FormControl<string>('', [Validators.required]),
    league: new FormControl<string>('', [Validators.required]),
  });

  get currentTournam(): Tournament {
    const tournam = this.formTournam.value as Tournament;
    return tournam;
  }

  onSubmit() {
    if (this.formTournam.invalid) {
      this.formTournam.markAllAsTouched();
      return;
    }
    if (!this.formTournam?.get('endDate')?.value) {
      this.formTournam?.get('endDate')?.setValue(null);
    }
    this.tournamentService.createTournament(this.currentTournam)
      .subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/tournament']);
          this.showSuccessNotification('Tournament created successfully! ' + response.name);
        },
        error: (error) => {
          console.log(error);
          this.showErrorNotification(
            'An error occurred while creating the tournament. ' + error.error.message);
        }
      });
  }

  isInvalid(fieldName: string): boolean {
    const control = this.formTournam.get(fieldName) as FormControl;
    return control.invalid && control.touched;
  }

  validateStartDate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const startDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      const currentDateStr = new Date(currentDate);
      if (startDate < currentDateStr) {
        this.startDateErrorMessage = 'La fecha de inicio debe ser posterior a la fecha actual.';
        return of({ invalidStartDate: true });
      }
      this.startDateErrorMessage = '';
      return of(null);
    };
  }

  validateEndDate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const endDate = new Date(control.value);
      const startDateControl = this.formTournam?.get('startDate')?.value;
      const startDate = new Date(startDateControl as string);
      if (endDate < startDate && this.formTournam?.get('endDate')?.value != null) {
        this.endDateErrorMessage = 'La fecha de finalización debe ser posterior a la fecha de inicio.';
        return of({ invalidEndDate: true });
      }
      this.endDateErrorMessage = '';
      return of(null);
    };
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

  /* if (this.currentTournam.id) {
    this.heroesService.updateHero(this.currentTournam)
      .subscribe(hero => {
        this.showSnackbar(`${hero.superhero} updated!`);
      });

    return;
  } */

}
