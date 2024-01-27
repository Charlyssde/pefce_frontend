import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionencuestasFormComponent } from './administracionencuestas-form.component';

describe('AdministracionencuestasFormComponent', () => {
  let component: AdministracionencuestasFormComponent;
  let fixture: ComponentFixture<AdministracionencuestasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionencuestasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionencuestasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
