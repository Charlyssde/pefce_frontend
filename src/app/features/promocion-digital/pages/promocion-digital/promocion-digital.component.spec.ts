import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionDigitalComponent } from './promocion-digital.component';

describe('PromocionDigitalComponent', () => {
  let component: PromocionDigitalComponent;
  let fixture: ComponentFixture<PromocionDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
