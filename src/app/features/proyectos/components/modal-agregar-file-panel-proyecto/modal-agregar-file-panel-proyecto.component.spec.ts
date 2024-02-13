import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarFilePanelProyectoComponent } from './modal-agregar-file-panel-proyecto.component';

describe('ModalAgregarFilePanelProyectoComponent', () => {
  let component: ModalAgregarFilePanelProyectoComponent;
  let fixture: ComponentFixture<ModalAgregarFilePanelProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarFilePanelProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarFilePanelProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
