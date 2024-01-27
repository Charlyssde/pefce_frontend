import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePromocionDigitalComponent } from './page-promocion-digital.component';

describe('PagePromocionDigitalComponent', () => {
  let component: PagePromocionDigitalComponent;
  let fixture: ComponentFixture<PagePromocionDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePromocionDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePromocionDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
