import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPromocionDigitalComponent } from './form-promocion-digital.component';

describe('FormPromocionDigitalComponent', () => {
  let component: FormPromocionDigitalComponent;
  let fixture: ComponentFixture<FormPromocionDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPromocionDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPromocionDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
