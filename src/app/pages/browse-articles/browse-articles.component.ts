import { Component } from '@angular/core';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { articleData } from '../../shared/article-data';

@Component({
  selector: 'app-browse-articles',
  imports: [ArticleCardComponent],
  templateUrl: './browse-articles.component.html',
  styleUrl: './browse-articles.component.css'
})
export class BrowseArticlesComponent {
  articleData = articleData;
}
