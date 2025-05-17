import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential
} from "@angular/fire/auth";
import { 
  Firestore, 
  collection, 
  doc, 
  setDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser : Observable<FirebaseUser | null>;

  constructor( private auth: Auth, private firestore: Firestore, private router: Router) { 
    this.currentUser = authState(this.auth);
  }

  login(email: string, password: string): Promise<UserCredential>{
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void>{
    localStorage.setItem('loggedIn', 'false');
    return signOut(this.auth).then(() => {this.router.navigateByUrl('/home')});
  }

  isLoggedIn(): Observable<FirebaseUser | null>{
    return this.currentUser;
  }

  updateLoginStatus(loggedIn:boolean):void{
    localStorage.setItem('loggedIn', loggedIn ? 'true' : 'false');
  }

  async signUp(email: string, password: string, username:string, userData: Partial<User>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        username: username,
        admin: false,
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);
    
    return setDoc(userRef, userData);
  }

}
