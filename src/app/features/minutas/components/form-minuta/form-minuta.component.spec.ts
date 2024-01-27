import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMinutaComponent } from './form-minuta.component';

describe('FormMinutaComponent', () => {
  let component: FormMinutaComponent;
  let fixture: ComponentFixture<FormMinutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMinutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
