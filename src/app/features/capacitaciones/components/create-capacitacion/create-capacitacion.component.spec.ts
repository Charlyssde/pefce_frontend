import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCapacitacionComponent } from './create-capacitacion.component';

describe('CreateCapacitacionComponent', () => {
  let component: CreateCapacitacionComponent;
  let fixture: ComponentFixture<CreateCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
