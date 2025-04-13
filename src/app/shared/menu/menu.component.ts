import { Component, Input, Output, EventEmitter} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';


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
export class MenuComponent{

  @Input() sidenav!: MatSidenav;

  @Input() loggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    window.location.href = '/home';
    this.closeMenu();
  }
}