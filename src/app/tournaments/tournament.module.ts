import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ImagePipe } from '../shared/pipes/image.pipe';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentRoutingModule } from './tournament-routing.module';


@NgModule({
  declarations: [
    TournamentPageComponent,
    SidebarComponent,
    FooterComponent,
    CardComponent,
    ParticipationPageComponent,
    ImagePipe,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class TournamentModule { }
