import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarMeetingsAdministradorComponent } from './modal-eliminar-meetings-administrador.component';

describe('ModalEliminarMeetingsAdministradorComponent', () => {
  let component: ModalEliminarMeetingsAdministradorComponent;
  let fixture: ComponentFixture<ModalEliminarMeetingsAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarMeetingsAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarMeetingsAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
