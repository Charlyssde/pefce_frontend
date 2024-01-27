import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSystemComponent } from './page-system.component';

describe('PageSystemComponent', () => {
  let component: PageSystemComponent;
  let fixture: ComponentFixture<PageSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
