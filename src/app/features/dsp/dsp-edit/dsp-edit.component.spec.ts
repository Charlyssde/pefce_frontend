import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspEditComponent } from './dsp-edit.component';

describe('DspEditComponent', () => {
  let component: DspEditComponent;
  let fixture: ComponentFixture<DspEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
