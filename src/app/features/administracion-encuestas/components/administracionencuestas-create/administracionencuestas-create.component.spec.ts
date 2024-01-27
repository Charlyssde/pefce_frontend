import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionEncuestasCreateComponent } from './administracionencuestas-create.component';

describe('AdministracionencuestasCreateComponent', () => {
  let component: AdministracionEncuestasCreateComponent;
  let fixture: ComponentFixture<AdministracionEncuestasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionEncuestasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionEncuestasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
