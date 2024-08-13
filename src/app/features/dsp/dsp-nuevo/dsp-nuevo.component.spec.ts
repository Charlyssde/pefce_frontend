import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspNuevoComponent } from './dsp-nuevo.component';

describe('DspNuevoComponent', () => {
  let component: DspNuevoComponent;
  let fixture: ComponentFixture<DspNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
