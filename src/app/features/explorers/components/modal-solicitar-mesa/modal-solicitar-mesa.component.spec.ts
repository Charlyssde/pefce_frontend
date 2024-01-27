import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitarMesaComponent } from './modal-solicitar-mesa.component';

describe('ModalSolicitarMesaComponent', () => {
  let component: ModalSolicitarMesaComponent;
  let fixture: ComponentFixture<ModalSolicitarMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSolicitarMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
