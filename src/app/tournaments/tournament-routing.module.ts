import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipationPageComponent } from './pages/participation-page/participation-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tournament', component: TournamentPageComponent },
      { path: 'participation/:id', component: ParticipationPageComponent },
      { path: '**', redirectTo: 'tournament' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
