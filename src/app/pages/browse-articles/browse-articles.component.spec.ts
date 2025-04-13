import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseArticlesComponent } from './browse-articles.component';

describe('BrowseArticlesComponent', () => {
  let component: BrowseArticlesComponent;
  let fixture: ComponentFixture<BrowseArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
