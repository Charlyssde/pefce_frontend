import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPaisComponent } from './catalogo-pais.component';

describe('CatalogoPaisComponent', () => {
  let component: CatalogoPaisComponent;
  let fixture: ComponentFixture<CatalogoPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
