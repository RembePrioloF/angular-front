import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tournament', component: TournamentPageComponent },
      { path: 'participation/:id', component: ParticipationPageComponent },
      { path: 'matches', component: MatchesPageComponent },
      { path: 'statistics', component: StatisticsPageComponent },
      { path: '**', redirectTo: 'tournament' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
