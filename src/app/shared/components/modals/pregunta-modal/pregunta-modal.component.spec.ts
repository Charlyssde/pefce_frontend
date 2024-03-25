import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaModalComponent } from './pregunta-modal.component';

describe('PreguntaModalComponent', () => {
  let component: PreguntaModalComponent;
  let fixture: ComponentFixture<PreguntaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
