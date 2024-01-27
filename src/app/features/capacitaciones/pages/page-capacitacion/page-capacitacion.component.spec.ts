import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCapacitacionComponent } from './page-capacitacion.component';

describe('PageCapacitacionComponent', () => {
  let component: PageCapacitacionComponent;
  let fixture: ComponentFixture<PageCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
