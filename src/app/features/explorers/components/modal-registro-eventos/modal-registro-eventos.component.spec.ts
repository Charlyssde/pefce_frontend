import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroEventosComponent } from './modal-registro-eventos.component';

describe('ModalRegistroEventosComponent', () => {
  let component: ModalRegistroEventosComponent;
  let fixture: ComponentFixture<ModalRegistroEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistroEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
