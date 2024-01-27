import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCapacitacionContactoModalComponent } from './ver-capacitacion-contacto-modal.component';

describe('VerCapacitacionContactoModalComponent', () => {
  let component: VerCapacitacionContactoModalComponent;
  let fixture: ComponentFixture<VerCapacitacionContactoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCapacitacionContactoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCapacitacionContactoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
