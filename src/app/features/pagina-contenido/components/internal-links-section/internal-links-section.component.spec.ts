import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalLinksSectionComponent } from './internal-links-section.component';

describe('InternalLinksSectionComponent', () => {
  let component: InternalLinksSectionComponent;
  let fixture: ComponentFixture<InternalLinksSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalLinksSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalLinksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
