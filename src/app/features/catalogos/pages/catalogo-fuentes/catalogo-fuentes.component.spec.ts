import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFuentesComponent } from './catalogo-fuentes.component';

describe('CatalogoFuentesComponent', () => {
  let component: CatalogoFuentesComponent;
  let fixture: ComponentFixture<CatalogoFuentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoFuentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoFuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
