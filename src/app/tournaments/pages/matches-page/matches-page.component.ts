import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../interfaces/team.interfece';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.css']
})
export class MatchesPageComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

  }

}
