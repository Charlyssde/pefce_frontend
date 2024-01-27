import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoClaseMinutaComponent } from './catalogo-clase-minuta.component';

describe('CatalogoClaseMinutaComponent', () => {
  let component: CatalogoClaseMinutaComponent;
  let fixture: ComponentFixture<CatalogoClaseMinutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoClaseMinutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoClaseMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
