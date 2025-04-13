import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowseArticlesComponent } from './pages/browse-articles/browse-articles.component';
import { ViewArticleComponent } from './pages/view-article/view-article.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },

    { path: 'login', component: LoginComponent },

    { path: 'profile', component: ProfileComponent },

    { path: 'browse-articles', component: BrowseArticlesComponent },

    { path: 'view-article', component: ViewArticleComponent },

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: '**', redirectTo: 'home' },

    /*
    {
        path: 'tasks',
        title: 'Tasks',
        component: TasksComponent,
        children: [
            { path: 'completed', component: CompletedComponent },
        ]
    },
    */
];
