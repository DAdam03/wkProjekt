import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  authSubscription? : Subscription;

  constructor( private authService: AuthService, private router: Router ){

  }

  login() {
    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.authService.login(emailValue, passwordValue).then(
      userCredential => {
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl("/home");
      }
    ).catch(
      error => {
        console.log("Error: ", error);

      }
    );

  }

  ngOnDestroy(){
    this.authSubscription?.unsubscribe();
  }
}
