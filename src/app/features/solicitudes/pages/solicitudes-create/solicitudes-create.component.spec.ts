import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesCreateComponent } from './solicitudes-create.component';

describe('SolicitudesCreateComponent', () => {
  let component: SolicitudesCreateComponent;
  let fixture: ComponentFixture<SolicitudesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
