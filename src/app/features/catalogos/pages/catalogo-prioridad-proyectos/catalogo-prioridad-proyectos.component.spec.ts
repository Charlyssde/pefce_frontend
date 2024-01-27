import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPrioridadProyectosComponent } from './catalogo-prioridad-proyectos.component';

describe('CatalogoPrioridadProyectosComponent', () => {
  let component: CatalogoPrioridadProyectosComponent;
  let fixture: ComponentFixture<CatalogoPrioridadProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoPrioridadProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoPrioridadProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
