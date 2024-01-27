import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosCreateComponent } from './proyectos-create.component';

describe('ProyectosCreateComponent', () => {
  let component: ProyectosCreateComponent;
  let fixture: ComponentFixture<ProyectosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
