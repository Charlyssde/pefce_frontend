import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosEstrategicosComponent } from './proyectos-estrategicos.component';

describe('ProyectosEstrategicosComponent', () => {
  let component: ProyectosEstrategicosComponent;
  let fixture: ComponentFixture<ProyectosEstrategicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosEstrategicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosEstrategicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
