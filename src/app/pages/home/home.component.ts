import { Component, OnInit } from '@angular/core';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { Article } from '../../model/article';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-home',
  imports: [ArticleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  articleData: Article[] = [];
  
  constructor(private articleService: ArticleService){}
  
  ngOnInit(): void {
    this.articleService.getLatestArticles().then(
      a => {this.articleData = a;}
    ).catch(error => {});
  }
}
