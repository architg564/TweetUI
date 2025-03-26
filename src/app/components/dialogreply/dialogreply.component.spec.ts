import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogreplyComponent } from './dialogreply.component';

describe('DialogreplyComponent', () => {
  let component: DialogreplyComponent;
  let fixture: ComponentFixture<DialogreplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogreplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
