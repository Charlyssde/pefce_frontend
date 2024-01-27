import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtraccionInversionesComponent } from './atraccion-inversiones.component';

describe('AtraccionInversionesComponent', () => {
  let component: AtraccionInversionesComponent;
  let fixture: ComponentFixture<AtraccionInversionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtraccionInversionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtraccionInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
