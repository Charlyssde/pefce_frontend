import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosEstrategicosAdminComponent } from './proyectos-estrategicos-admin.component';

describe('ProyectosEstrategicosAdminComponent', () => {
  let component: ProyectosEstrategicosAdminComponent;
  let fixture: ComponentFixture<ProyectosEstrategicosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosEstrategicosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosEstrategicosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
