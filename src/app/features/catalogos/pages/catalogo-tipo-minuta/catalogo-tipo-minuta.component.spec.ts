import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTipoMinutaComponent } from './catalogo-tipo-minuta.component';

describe('CatalogoTipoMinutaComponent', () => {
  let component: CatalogoTipoMinutaComponent;
  let fixture: ComponentFixture<CatalogoTipoMinutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoTipoMinutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTipoMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
