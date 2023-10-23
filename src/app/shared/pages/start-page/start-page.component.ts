import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

  constructor(
    private router: Router,
  ) { }

  onLogin() {
    this.router.navigate(['/auth/login'])
  }

  onRegister() {
    this.router.navigate(['/auth/register'])
  }

}
