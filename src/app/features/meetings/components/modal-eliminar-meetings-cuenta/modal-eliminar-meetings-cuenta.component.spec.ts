import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarMeetingsCuentaComponent } from './modal-eliminar-meetings-cuenta.component';

describe('ModalEliminarMeetingsCuentaComponent', () => {
  let component: ModalEliminarMeetingsCuentaComponent;
  let fixture: ComponentFixture<ModalEliminarMeetingsCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarMeetingsCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarMeetingsCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
