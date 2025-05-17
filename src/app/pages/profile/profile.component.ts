import { Component, OnInit, OnDestroy } from '@angular/core';
import { userData } from '../../shared/user-data';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../shared/services/article.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { Article } from '../../model/article';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, ArticleCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  articles: Article[] = [];
  private subscription: Subscription | null = null;

  constructor( private authService: AuthService, private userService: UserService, private articleService: ArticleService){

  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.articleService.getArticlesOfCurrentUser().then(
          a => {this.articles = a;}
        ).catch(error => {});
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
