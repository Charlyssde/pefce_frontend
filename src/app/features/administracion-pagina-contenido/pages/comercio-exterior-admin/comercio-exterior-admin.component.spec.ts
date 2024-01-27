import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercioExteriorAdminComponent } from './comercio-exterior-admin.component';

describe('ComercioExteriorAdminComponent', () => {
  let component: ComercioExteriorAdminComponent;
  let fixture: ComponentFixture<ComercioExteriorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComercioExteriorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercioExteriorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
