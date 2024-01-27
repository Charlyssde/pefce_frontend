import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTipoMesaNegociacionComponent } from './catalogo-tipo-mesa-negociacion.component';

describe('CatalogoTipoMesaNegociacionComponent', () => {
  let component: CatalogoTipoMesaNegociacionComponent;
  let fixture: ComponentFixture<CatalogoTipoMesaNegociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoTipoMesaNegociacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTipoMesaNegociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
