import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestingSitesSectionComponent } from './interesting-sites-section.component';

describe('InterestingSitesSectionComponent', () => {
  let component: InterestingSitesSectionComponent;
  let fixture: ComponentFixture<InterestingSitesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestingSitesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestingSitesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
