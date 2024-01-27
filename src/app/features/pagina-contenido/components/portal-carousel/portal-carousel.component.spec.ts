import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalCarouselComponent } from './portal-carousel.component';

describe('PortalCarouselComponent', () => {
  let component: PortalCarouselComponent;
  let fixture: ComponentFixture<PortalCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
