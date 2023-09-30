import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interfece';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css']
})
export class TournamentPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
