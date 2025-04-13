import { Component, Input} from '@angular/core';
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


  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}