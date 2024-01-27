import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromocionDigitalComponent } from './create-promocion-digital.component';

describe('CreatePromocionDigitalComponent', () => {
  let component: CreatePromocionDigitalComponent;
  let fixture: ComponentFixture<CreatePromocionDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePromocionDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePromocionDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
