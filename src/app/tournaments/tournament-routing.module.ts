import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTournamPageComponent } from './pages/new-tournam-page/new-tournam-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tournament', component: TournamentPageComponent },
      { path: 'new-tournam', component: NewTournamPageComponent },
      { path: '**', redirectTo: 'tournament' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
