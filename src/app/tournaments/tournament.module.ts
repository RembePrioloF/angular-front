import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { StartPageComponent } from '../shared/pages/start-page/start-page.component';
import { ImagePipe } from '../shared/pipes/image.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TournamCardComponent } from './components/tournam-card/tournam-card.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentRoutingModule } from './tournament-routing.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


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
    StatisticsPageComponent,
    MatchCardComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  providers: [],
})
export class TournamentModule { }
