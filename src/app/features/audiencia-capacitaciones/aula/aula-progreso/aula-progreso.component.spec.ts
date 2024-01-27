import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaProgresoComponent } from './aula-progreso.component';

describe('AulaProgresoComponent', () => {
  let component: AulaProgresoComponent;
  let fixture: ComponentFixture<AulaProgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaProgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
