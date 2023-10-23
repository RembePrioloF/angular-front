import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { StartPageComponent } from './shared/pages/start-page/start-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard], canMatch: [PublicGuard]
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./tournaments/tournament.module').then(m => m.TournamentModule),
    canActivate: [AuthGuard], canMatch: [AuthGuard]
  },
  {
    path: 'start',
    component: StartPageComponent,
    canActivate: [PublicGuard], canMatch: [PublicGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
