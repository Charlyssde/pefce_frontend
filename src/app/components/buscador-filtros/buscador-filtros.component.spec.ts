import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorFiltrosComponent } from './buscador-filtros.component';

describe('BuscadorFiltrosComponent', () => {
  let component: BuscadorFiltrosComponent;
  let fixture: ComponentFixture<BuscadorFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
