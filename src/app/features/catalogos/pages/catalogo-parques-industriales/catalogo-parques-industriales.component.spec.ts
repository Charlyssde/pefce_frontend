import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoParquesIndustrialesComponent } from './catalogo-parques-industriales.component';

describe('CatalogoParquesIndustrialesComponent', () => {
  let component: CatalogoParquesIndustrialesComponent;
  let fixture: ComponentFixture<CatalogoParquesIndustrialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoParquesIndustrialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoParquesIndustrialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
