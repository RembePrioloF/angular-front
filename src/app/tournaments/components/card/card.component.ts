import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '../../interfaces/tournament.interfece';

@Component({
  selector: 'tournam-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {


  @Input()
  public tournament!: Tournament;

  newTournam() {

  }

}
