import { Component } from '@angular/core';
import { userData } from '../../shared/user-data';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  firstUser = userData[0];

  logout(){
    localStorage.setItem('loggedIn', 'false');
    window.location.href = '/home';
  }
}
