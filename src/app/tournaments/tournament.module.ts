import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListTournamPageComponent } from './pages/list-tournam-page/list-tournam-page.component';
import { NewTournamPageComponent } from './pages/new-tournam-page/new-tournam-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentRoutingModule } from './tournament-routing.module';


@NgModule({
  declarations: [
    TournamentPageComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
    NewTournamPageComponent,
    ListTournamPageComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class TournamentModule { }
