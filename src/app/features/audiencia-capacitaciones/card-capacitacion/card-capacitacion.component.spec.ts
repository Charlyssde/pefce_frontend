import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCapacitacionComponent } from './card-capacitacion.component';

describe('CardCapacitacionComponent', () => {
  let component: CardCapacitacionComponent;
  let fixture: ComponentFixture<CardCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
