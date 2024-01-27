import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEstatusProyectosComponent } from './catalogo-estatus-proyectos.component';

describe('CatalogoEstatusProyectosComponent', () => {
  let component: CatalogoEstatusProyectosComponent;
  let fixture: ComponentFixture<CatalogoEstatusProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoEstatusProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoEstatusProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
