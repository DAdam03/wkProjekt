import { Component } from '@angular/core';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';

@Component({
  selector: 'app-browse-articles',
  imports: [ArticleCardComponent],
  templateUrl: './browse-articles.component.html',
  styleUrl: './browse-articles.component.css'
})
export class BrowseArticlesComponent {

}
