import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModuloComponent } from './form-modulo.component';

describe('FormModuloComponent', () => {
  let component: FormModuloComponent;
  let fixture: ComponentFixture<FormModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
