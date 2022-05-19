import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorBoardComponent } from './creator-board.component';

describe('CreatorBoardComponent', () => {
  let component: CreatorBoardComponent;
  let fixture: ComponentFixture<CreatorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
