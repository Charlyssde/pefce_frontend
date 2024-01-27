import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageModuloComponent } from './page-modulo.component';

describe('PageModuloComponent', () => {
  let component: PageModuloComponent;
  let fixture: ComponentFixture<PageModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
