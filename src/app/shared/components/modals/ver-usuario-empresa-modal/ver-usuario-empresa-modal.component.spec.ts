import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuarioEmpresaModalComponent } from './ver-usuario-empresa-modal.component';

describe('VerUsuarioEmpresaModalComponent', () => {
  let component: VerUsuarioEmpresaModalComponent;
  let fixture: ComponentFixture<VerUsuarioEmpresaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerUsuarioEmpresaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerUsuarioEmpresaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
