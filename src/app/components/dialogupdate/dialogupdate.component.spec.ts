import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogupdateComponent } from './dialogupdate.component';

describe('DialogupdateComponent', () => {
  let component: DialogupdateComponent;
  let fixture: ComponentFixture<DialogupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
