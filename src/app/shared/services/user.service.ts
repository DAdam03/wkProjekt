import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null
          });
        }

        return from(this.fetchUser(authUser.uid));
      })
    );
  }

  
  getUserName(userId :string): Observable<string> {
    return from(this.fetchUserName(userId));
  }

  private async fetchUserName(userId: string): Promise<string> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return "";
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      return user.username;
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return "";
    }
  }

  private async fetchUser(userId: string): Promise<{
    user: User | null
  }> {
    try {
      // Felhasználó adatainak lekérése
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      return {
        user
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null
      };
    }
  }
}
