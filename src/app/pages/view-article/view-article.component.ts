import { Component } from '@angular/core';
import { CommentCardComponent } from '../../shared/comment-card/comment-card.component';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-view-article',
  imports: [CommentCardComponent, MatChipsModule],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css'
})
export class ViewArticleComponent {

}
