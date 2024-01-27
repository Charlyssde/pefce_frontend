import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarConstanciaComponent } from './validar-constancia.component';

describe('ValidarConstanciaComponent', () => {
  let component: ValidarConstanciaComponent;
  let fixture: ComponentFixture<ValidarConstanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarConstanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarConstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
