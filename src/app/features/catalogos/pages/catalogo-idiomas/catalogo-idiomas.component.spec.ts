import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoIdiomasComponent } from './catalogo-idiomas.component';

describe('CatalogoIdiomasComponent', () => {
  let component: CatalogoIdiomasComponent;
  let fixture: ComponentFixture<CatalogoIdiomasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoIdiomasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
