import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  loggedIn = false;
  private authSubscription?: Subscription;

  constructor( private authService: AuthService, private router: Router ){}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.loggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.loggedIn ? 'true' : 'false');
    });
  }

  checkLoggedIn(): void {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  logout(): void {
    this.authService.logout();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}