import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarImagePanelProyectoComponent } from './modal-agregar-image-panel-proyecto.component';

describe('ModalAgregarImagePanelProyectoComponent', () => {
  let component: ModalAgregarImagePanelProyectoComponent;
  let fixture: ComponentFixture<ModalAgregarImagePanelProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarImagePanelProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarImagePanelProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
