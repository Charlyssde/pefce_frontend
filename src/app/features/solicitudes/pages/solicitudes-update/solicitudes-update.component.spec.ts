import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUpdateComponent } from './solicitudes-update.component';

describe('SolicitudesUpdateComponent', () => {
  let component: SolicitudesUpdateComponent;
  let fixture: ComponentFixture<SolicitudesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
