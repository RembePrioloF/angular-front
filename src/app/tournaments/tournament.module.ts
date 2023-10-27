import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { StartPageComponent } from '../shared/pages/start-page/start-page.component';
import { ImagePipe } from '../shared/pipes/image.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TournamCardComponent } from './components/tournam-card/tournam-card.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentRoutingModule } from './tournament-routing.module';
import { MatchCardComponent } from './components/match-card/match-card.component';


@NgModule({
  declarations: [
    TournamentPageComponent,
    NavbarComponent,
    FooterComponent,
    TournamCardComponent,
    ParticipationPageComponent,
    ImagePipe,
    StartPageComponent,
    Error404PageComponent,
    MatchesPageComponent,
    ResultsPageComponent,
    MatchCardComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class TournamentModule { }
