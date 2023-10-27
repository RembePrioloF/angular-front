import { Component, Input } from '@angular/core';
import { Tournament } from '../../interfaces/tournament.interfece';

@Component({
  selector: 'tournam-card',
  templateUrl: './tournam-card.component.html',
  styleUrls: ['./tournam-card.component.css']
})
export class TournamCardComponent {

  @Input()
  public tournament!: Tournament;

}
