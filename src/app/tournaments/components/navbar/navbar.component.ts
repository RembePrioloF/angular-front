import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id: string = '';
  name: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.authService.getUserId() as string;
    this.authService.getUserById(this.id)
      .subscribe((response) => {
        this.name = response?.name as string;
      });
  }

  onEdit(){
    console.log('click');

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
