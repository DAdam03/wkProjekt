import { Component } from '@angular/core';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { articleData } from '../../shared/article-data';

@Component({
  selector: 'app-home',
  imports: [ArticleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  articleData = articleData;
  firstArticle = articleData[0];
}
