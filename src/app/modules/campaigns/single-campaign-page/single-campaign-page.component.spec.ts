import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCampaignPageComponent } from './single-campaign-page.component';

describe('SingleCampaignPageComponent', () => {
  let component: SingleCampaignPageComponent;
  let fixture: ComponentFixture<SingleCampaignPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCampaignPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCampaignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
