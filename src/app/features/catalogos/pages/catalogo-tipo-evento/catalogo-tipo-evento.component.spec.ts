import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTipoEventoComponent } from './catalogo-tipo-evento.component';

describe('CatalogoTipoEventoComponent', () => {
  let component: CatalogoTipoEventoComponent;
  let fixture: ComponentFixture<CatalogoTipoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoTipoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTipoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
