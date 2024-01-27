import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleAreaSectionComponent } from './title-area-section.component';

describe('TitleAreaSectionComponent', () => {
  let component: TitleAreaSectionComponent;
  let fixture: ComponentFixture<TitleAreaSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleAreaSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleAreaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
