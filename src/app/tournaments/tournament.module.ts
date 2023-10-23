import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { StartPageComponent } from '../shared/pages/start-page/start-page.component';
import { ImagePipe } from '../shared/pipes/image.pipe';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentRoutingModule } from './tournament-routing.module';


@NgModule({
  declarations: [
    TournamentPageComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    ParticipationPageComponent,
    ImagePipe,
    StartPageComponent,
    Error404PageComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class TournamentModule { }
