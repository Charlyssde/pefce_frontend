import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAreasComponent } from './catalogo-areas.component';

describe('CatalogoAreasComponent', () => {
  let component: CatalogoAreasComponent;
  let fixture: ComponentFixture<CatalogoAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
