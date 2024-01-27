import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosPipelineComponent } from './proyectos-pipeline.component';

describe('ProyectosPipelineComponent', () => {
  let component: ProyectosPipelineComponent;
  let fixture: ComponentFixture<ProyectosPipelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosPipelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
