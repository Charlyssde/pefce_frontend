import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEventoEmpresaComponent } from './page-evento-empresa.component';

describe('PageEventoEmpresaComponent', () => {
  let component: PageEventoEmpresaComponent;
  let fixture: ComponentFixture<PageEventoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEventoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEventoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
