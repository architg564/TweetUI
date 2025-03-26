import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserTweetsComponent } from './show-user-tweets.component';

describe('ShowUserTweetsComponent', () => {
  let component: ShowUserTweetsComponent;
  let fixture: ComponentFixture<ShowUserTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUserTweetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
