import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePromocionDigitalComponent } from './update-promocion-digital.component';

describe('UpdatePromocionDigitalComponent', () => {
  let component: UpdatePromocionDigitalComponent;
  let fixture: ComponentFixture<UpdatePromocionDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePromocionDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePromocionDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
