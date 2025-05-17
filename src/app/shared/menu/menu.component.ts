import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnDestroy{

  @Input() sidenav!: MatSidenav;

  @Input() loggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }
}