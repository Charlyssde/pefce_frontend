import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSubsectoresComponent } from './catalogo-subsectores.component';

describe('CatalogoSubsectoresComponent', () => {
  let component: CatalogoSubsectoresComponent;
  let fixture: ComponentFixture<CatalogoSubsectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoSubsectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoSubsectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
