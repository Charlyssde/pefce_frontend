import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCapacitacionComponent } from './update-capacitacion.component';

describe('UpdateCapacitacionComponent', () => {
  let component: UpdateCapacitacionComponent;
  let fixture: ComponentFixture<UpdateCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
