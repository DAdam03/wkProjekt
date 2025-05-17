import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  signupError = '';

  constructor(private router: Router, private authService: AuthService) {

  }

  signup() {
    if (this.signUpForm.invalid) {
      this.signupError = 'Please correct any errors on the form before submitting.';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;
    
    if (password !== rePassword) {
      this.signupError = 'The passwords do not match.';
      return;
    }

    const userData: Partial<User> = {
      email: this.signUpForm.value.email || '',
      username: this.signUpForm.value.username || ''
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';
    const username = this.signUpForm.value.username || '';

    this.authService.signUp(email, pw, username, userData)
      .then(userCredential => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email already in use.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Invalid email.';
            break;
          case 'auth/weak-password':
            this.signupError = 'The password is too weak. Use at least 6 characters.';
            break;
          default:
            this.signupError = 'An error has occurred during registration. Please try again later.';
        }
      });

  }
}
