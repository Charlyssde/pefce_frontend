import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionEncuestasPageComponent } from './administracionencuestas-page.component';

describe('AdministracionEncuestasPageComponent', () => {
  let component: AdministracionEncuestasPageComponent;
  let fixture: ComponentFixture<AdministracionEncuestasPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionEncuestasPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionEncuestasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
