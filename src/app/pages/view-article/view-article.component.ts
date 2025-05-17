import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentCardComponent } from '../../shared/comment-card/comment-card.component';
import {MatChipsModule} from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../model/article';
import { ArticleService } from '../../shared/services/article.service';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { CommentService } from '../../shared/services/comment.service';
import { Comment } from '../../model/comment';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipePipe } from '../../shared/pipes/date-pipe.pipe';
import { UsernamePipe } from '../../shared/pipes/username.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-article',
  imports: [
    CommentCardComponent, 
    MatChipsModule, 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipePipe,
    UsernamePipe,
    AsyncPipe
  ],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css'
})



export class ViewArticleComponent implements OnInit, OnDestroy {

  articleData: Article | null;
  curUserId: string = "";
  commentData: Comment[] = [];
  replyData: Comment[] = [];
  replyingTo: Comment | null = null;

  private subscription: Subscription | null = null;

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  setId(aId: string) {
    this.articleService.getArticleById(aId).then(
      a => {
        this.articleData = a;
        this.loadUserProfile();
        if(a){
          this.commentService.getAllCommentsByArticleId(a.id).then(
            comments => {
              this.commentData = comments;
              for(let i=0; i<this.commentData.length; i++){
                this.commentService.getAllReplys(this.commentData[i].id).then(
                  r => {this.replyData = this.replyData.concat(r);}
                ).catch(e => {});
              }
            }
          ).catch(e => {});
        }
        
      }
    ).catch(e => {});
  }

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private userService: UserService, private commentService: CommentService){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.setId(id);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserProfile(): void {
    this.subscription = this.userService.getUserProfile().subscribe({
      next: (data) => {
        if(data.user){
          this.curUserId = data.user.id;
        }
      },
      error: (error) => {
        console.error('Hiba a felhasználói profil betöltésekor:', error);
      }
    });
  }

  saveComment(): void {
    if (this.commentForm.invalid || this.curUserId == "") {
      return;
    }

    let replyingId = '';
    if(this.replyingTo){
      replyingId = this.replyingTo.id;
    }

    const commentData: Partial<Comment> = {
      content: this.commentForm.value.comment || '',
      articleId: this.articleData?.id,
      replyTo: replyingId
    }

    this.commentService.addComment(commentData).then(
      comment => {
        if(this.articleData){
          window.location.reload();
        }
      }
    );
  }

  deleteArticle(): void{
    if(this.articleData){
      this.articleService.deleteArticle(this.articleData.id).then(
        () => {
          this.router.navigateByUrl('/home');
        }
      );
    }
  }

  reply(comment:Comment, cf:HTMLElement){
    this.replyingTo = comment
    cf.scrollIntoView();
  }

  deleteComment(comment:Comment){
    this.commentService.deleteComment(comment.id).then(
      () => {
        if(this.articleData){
          window.location.reload();
        }
      }
    );
  }
  
}
