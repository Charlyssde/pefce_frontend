import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaModalComponent } from './encuesta-modal.component';

describe('EncuestaModalComponent', () => {
  let component: EncuestaModalComponent;
  let fixture: ComponentFixture<EncuestaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
