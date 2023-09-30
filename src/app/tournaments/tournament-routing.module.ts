import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentPageComponent } from './pages/tournament-page.component';

const routes: Routes = [
  {
    path: '', component: TournamentPageComponent,
    children: [
      { path: 'tournament', component: TournamentPageComponent },
      { path: '**', redirectTo: 'tournament' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
