import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoRegimenFiscalComponent } from './catalogo-regimen-fiscal.component';

describe('CatalogoRegimenFiscalComponent', () => {
  let component: CatalogoRegimenFiscalComponent;
  let fixture: ComponentFixture<CatalogoRegimenFiscalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoRegimenFiscalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoRegimenFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
