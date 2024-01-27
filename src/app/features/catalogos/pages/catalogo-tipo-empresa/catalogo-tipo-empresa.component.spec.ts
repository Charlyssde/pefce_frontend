import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTipoEmpresaComponent } from './catalogo-tipo-empresa.component';

describe('CatalogoTipoEmpresaComponent', () => {
  let component: CatalogoTipoEmpresaComponent;
  let fixture: ComponentFixture<CatalogoTipoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoTipoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTipoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
