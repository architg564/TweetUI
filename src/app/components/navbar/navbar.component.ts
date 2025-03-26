import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  get LoggedIn(): boolean {
    // Dynamically check if the user is logged in by verifying the token
    return this.loginService.isLoggedIn();
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // this.LoggedIn = this.loginService.isLoggedIn();
  }
  logoutUser() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

}