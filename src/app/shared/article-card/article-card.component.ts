import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule, RouterLink],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {
  @Input() data !: Article;
}
