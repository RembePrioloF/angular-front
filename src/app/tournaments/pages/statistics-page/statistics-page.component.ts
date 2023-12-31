import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PlayerInMatch } from '../../interfaces/player-in-match.interfece';
import { TournamentService } from '../../services/tournament.service';

interface PlayerEvent {
  playerId: string;
  playerName: string;
  teamName: string;
  point: number;
}

@Component({
  selector: 'statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  isLoading = false;
  tournamId: string = '';
  playerGoals: PlayerEvent[] = [];
  redCard: PlayerEvent[] = [];
  yellowCard: PlayerEvent[] = [];
  blueCard: PlayerEvent[] = [];
  playerInMatches: PlayerInMatch[] = [];

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private tournamService: TournamentService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamId = params['id'];
      this.fetchTournamentData(this.tournamId);
    });
  }

  fetchTournamentData(tournamId: string): void {
    this.tournamService.getTournamentById(tournamId).subscribe((response) => {
      if (Array.isArray(response?.playerInMatches)) {
        response?.playerInMatches.forEach(item => { this.handleEvent(item); });
      }
    });
  }

  handleEvent(item: any) {
    const playerId = item.player.playerId;
    switch (item.matchEvent) {
      case 'gol marcado':
        this.updateEventArray(this.playerGoals, playerId, item);
        break;
      case 'tarjeta roja':
        this.updateEventArray(this.redCard, playerId, item);
        break;
      case 'tarjeta amarilla':
        this.updateEventArray(this.yellowCard, playerId, item);
        break;
      case 'tarjeta azul':
        this.updateEventArray(this.blueCard, playerId, item);
        break;
    }
  }

  updateEventArray(eventArray: any[], playerId: string, item: any) {
    const playerIndex = eventArray.findIndex(player => player.playerId === playerId);
    if (playerIndex !== -1) {
      eventArray[playerIndex].point += item.point;
    } else {
      eventArray.push({
        playerId,
        playerName: item.player.name,
        teamName: item.player.team.name,
        point: item.point
      });
    }
  }

  sendEmail() {
    const componentElement = this.elementRef.nativeElement.cloneNode(true);
    const appNavbarElement = componentElement.querySelector('app-navbar');
    const buttonElement = componentElement.querySelector('button.btn-outline-secondary');
    if (appNavbarElement) {
      appNavbarElement.remove();
      buttonElement.remove();
      Swal.fire({
        title: "¿Está seguro de enviar las estadisticas?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#6a6d70",
        confirmButtonText: "Si, envialos"
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          const htmlTemplate = componentElement.innerHTML;
          this.sendEmailWithTemplate(htmlTemplate).subscribe({
            next: (response: any) => {
              this.showSuccessNotification(response.message);
              this.isLoading = false;
            },
            error: (error) => {
              this.showErrorNotification('' + error.error.message);
              this.isLoading = false;
            }
          });
        }
      });

    }
  }

  sendEmailWithTemplate(htmlTemplate: string) {
    const payload = { htmlTemplate };
    return this.http.post('http://localhost:3000/player_in_match/sendEmail', payload);
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
