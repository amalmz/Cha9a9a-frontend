import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCampaignsComponent } from './list-of-campaigns.component';

describe('ListOfCampaignsComponent', () => {
  let component: ListOfCampaignsComponent;
  let fixture: ComponentFixture<ListOfCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCampaignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
