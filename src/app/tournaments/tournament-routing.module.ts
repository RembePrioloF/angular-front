import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tournament', component: TournamentPageComponent },
      { path: 'participation/:id', component: ParticipationPageComponent },
      { path: 'matches', component: MatchesPageComponent },
      { path: 'statistics', component: ResultsPageComponent },
      { path: '**', redirectTo: 'tournament' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
