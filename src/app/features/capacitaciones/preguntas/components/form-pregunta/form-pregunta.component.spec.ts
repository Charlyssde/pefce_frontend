import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreguntaComponent } from './form-pregunta.component';

describe('FormPreguntaComponent', () => {
  let component: FormPreguntaComponent;
  let fixture: ComponentFixture<FormPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
