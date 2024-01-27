import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCapacitacionContactoComponent } from './page-capacitacion-contacto.component';

describe('PageCapacitacionContactoComponent', () => {
  let component: PageCapacitacionContactoComponent;
  let fixture: ComponentFixture<PageCapacitacionContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCapacitacionContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCapacitacionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
