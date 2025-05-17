import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Article } from '../../model/article';
import { DatePipePipe } from '../pipes/date-pipe.pipe';
import { UsernamePipe } from '../pipes/username.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule, RouterLink, DatePipePipe, UsernamePipe, AsyncPipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {
  @Input() data !: Article;
}
