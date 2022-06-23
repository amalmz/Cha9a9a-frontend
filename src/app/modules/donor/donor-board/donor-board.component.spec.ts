import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorBoardComponent } from './donor-board.component';

describe('DonorBoardComponent', () => {
  let component: DonorBoardComponent;
  let fixture: ComponentFixture<DonorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
