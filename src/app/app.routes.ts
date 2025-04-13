import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowseArticlesComponent } from './pages/browse-articles/browse-articles.component';
import { ViewArticleComponent } from './pages/view-article/view-article.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    // Statikus elérési útvonalak
    { path: 'home', component: HomeComponent },
    // Lazy loading a Tasks komponens
    /*
    {
        path: 'tasks',
        loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent),
    },
    */
    { path: 'login', component: LoginComponent },

    { path: 'profile', component: ProfileComponent },

    { path: 'browse-articles', component: BrowseArticlesComponent },

    { path: 'view-article', component: ViewArticleComponent },

    // Paraméterezett útvonalak
    // { path: 'task-edit/:id', component: TaskEditComponent },

    // Üres elérési út - alapértelmezett útvonal
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Wildcard útvonal - ha egyik útvonal sem egyezik
    //{ path: '**', component: HomeComponent }
    
    { path: '**', redirectTo: 'home' },

    // Útvonalak egymásba ágyazása
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
