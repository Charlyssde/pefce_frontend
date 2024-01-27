import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMinutaComponent } from './page-minuta.component';

describe('PageMinutaComponent', () => {
  let component: PageMinutaComponent;
  let fixture: ComponentFixture<PageMinutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMinutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
