import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { commentData } from '../comment-data';

@Component({
  selector: 'app-comment-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent {
  firstComment = commentData[0]; 
}
