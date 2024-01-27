import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoIdiomasEtiquetasComponent } from './catalogo-idiomas-etiquetas.component';

describe('CatalogoIdiomasEtiquetasComponent', () => {
  let component: CatalogoIdiomasEtiquetasComponent;
  let fixture: ComponentFixture<CatalogoIdiomasEtiquetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoIdiomasEtiquetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoIdiomasEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
