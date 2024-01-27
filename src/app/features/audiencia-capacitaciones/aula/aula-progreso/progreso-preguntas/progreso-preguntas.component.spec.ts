import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoPreguntasComponent } from './progreso-preguntas.component';

describe('ProgresoPreguntasComponent', () => {
  let component: ProgresoPreguntasComponent;
  let fixture: ComponentFixture<ProgresoPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresoPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
