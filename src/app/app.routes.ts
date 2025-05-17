import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowseArticlesComponent } from './pages/browse-articles/browse-articles.component';
import { ViewArticleComponent } from './pages/view-article/view-article.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';

import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },

    { path: 'login', component: LoginComponent, canActivate: [publicGuard] },

    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

    { path: 'create-arcticle', component: CreateArticleComponent, canActivate: [authGuard] },

    { path: 'browse-articles', component: BrowseArticlesComponent },

    { path: 'view-article/:id', component: ViewArticleComponent },

    { path: 'signup', component: SignupComponent, canActivate: [publicGuard] },

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: '**', redirectTo: 'home' },

];
