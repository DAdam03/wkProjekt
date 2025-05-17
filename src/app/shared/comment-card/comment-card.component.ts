import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Comment } from '../../model/comment';
import { DatePipePipe } from '../pipes/date-pipe.pipe';
import { UsernamePipe } from '../pipes/username.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-comment-card',
  imports: [MatCardModule, MatButtonModule, DatePipePipe, UsernamePipe, AsyncPipe],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent {
  @Input() data !: Comment;
  @Input() canDelete !: boolean;
  @Output() replyEvent = new EventEmitter<Comment>;
  @Output() deleteEvent = new EventEmitter<Comment>;
  


  reply(){
    this.replyEvent.emit(this.data);
  }

  deleteComment(){
    this.deleteEvent.emit(this.data);
  }
  

}
