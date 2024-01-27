import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoModuloComponent } from './progreso-modulo.component';

describe('ProgresoModuloComponent', () => {
  let component: ProgresoModuloComponent;
  let fixture: ComponentFixture<ProgresoModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresoModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
