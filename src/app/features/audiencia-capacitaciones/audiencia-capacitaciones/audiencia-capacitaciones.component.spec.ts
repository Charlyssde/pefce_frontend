import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciaCapacitacionesComponent } from './audiencia-capacitaciones.component';

describe('AudienciaCapacitacionesComponent', () => {
  let component: AudienciaCapacitacionesComponent;
  let fixture: ComponentFixture<AudienciaCapacitacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienciaCapacitacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienciaCapacitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
