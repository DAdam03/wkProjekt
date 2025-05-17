import { Component, OnInit } from '@angular/core';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { Article } from '../../model/article';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-browse-articles',
  imports: [ArticleCardComponent],
  templateUrl: './browse-articles.component.html',
  styleUrl: './browse-articles.component.css'
})
export class BrowseArticlesComponent implements OnInit {
  articleData: Article[] = [];

  constructor(private articleService: ArticleService){}

  ngOnInit(): void {
    this.articleService.getAllArticles().then(
      a => {this.articleData = a;}
    ).catch(error => {});
  }
}
