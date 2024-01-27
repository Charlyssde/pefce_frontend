import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercioExteriorComponent } from './comercio-exterior.component';

describe('ComercioExteriorComponent', () => {
  let component: ComercioExteriorComponent;
  let fixture: ComponentFixture<ComercioExteriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComercioExteriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComercioExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
