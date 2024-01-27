import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioPreguntaComponent } from './cuestionario-pregunta.component';

describe('CuestionarioPreguntaComponent', () => {
  let component: CuestionarioPreguntaComponent;
  let fixture: ComponentFixture<CuestionarioPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
