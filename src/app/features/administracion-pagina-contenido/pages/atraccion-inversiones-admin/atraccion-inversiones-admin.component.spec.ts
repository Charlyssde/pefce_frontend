import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtraccionInversionesAdminComponent } from './atraccion-inversiones-admin.component';

describe('AtraccionInversionesAdminComponent', () => {
  let component: AtraccionInversionesAdminComponent;
  let fixture: ComponentFixture<AtraccionInversionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtraccionInversionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtraccionInversionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
