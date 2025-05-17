import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, Component, inject, signal, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Article } from '../../model/article';
import { ArticleService } from '../../shared/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, ReactiveFormsModule, FormsModule, MatIconModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {

  articleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    content: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tags: new FormControl('')
  });

  readonly reactiveKeywords = signal(['music']);

  announcer = inject(LiveAnnouncer);
  articleId = "";

  constructor(private router: Router, private articleService: ArticleService){

  }

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  saveArticle() {
    if (this.articleForm.invalid) {
      return;
    }

    const articleData: Partial<Article> = {
      title: this.articleForm.value.title || '',
      description: this.articleForm.value.description || '',
      content: this.articleForm.value.content || '',
      tags: this.reactiveKeywords(),
      likedBy: [],
      dislikedBy: []
    };

    if(this.articleId == ""){
      this.articleService.addArticle(articleData).then(article => {
        console.log('Added article:', article.id);
        this.router.navigateByUrl('/profile');
      });
    }else{
      this.articleService.updateArticle(this.articleId, articleData).then(article => {
        console.log('Updated article:', this.articleId);
        this.router.navigateByUrl('/profile');
      });
    }
  }

}
