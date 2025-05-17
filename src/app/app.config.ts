import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "zeneblogwebkert", appId: "1:778394965482:web:5a92d81bdfeb2f5fd2ce93", storageBucket: "zeneblogwebkert.firebasestorage.app", apiKey: "AIzaSyDIOFqFZMDDvC5BeSTFlRUImWNoGvHNMko", authDomain: "zeneblogwebkert.firebaseapp.com", messagingSenderId: "778394965482" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
