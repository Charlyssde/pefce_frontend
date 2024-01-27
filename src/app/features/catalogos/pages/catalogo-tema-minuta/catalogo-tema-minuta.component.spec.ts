import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTemaMinutaComponent } from './catalogo-tema-minuta.component';

describe('CatalogoTemaMinutaComponent', () => {
  let component: CatalogoTemaMinutaComponent;
  let fixture: ComponentFixture<CatalogoTemaMinutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoTemaMinutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTemaMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
