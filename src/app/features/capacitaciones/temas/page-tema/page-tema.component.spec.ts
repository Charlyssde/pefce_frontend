import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemaComponent } from './page-tema.component';

describe('PageTemaComponent', () => {
  let component: PageTemaComponent;
  let fixture: ComponentFixture<PageTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
