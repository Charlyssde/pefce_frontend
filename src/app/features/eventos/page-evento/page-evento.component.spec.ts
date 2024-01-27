import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEventoComponent } from './page-evento.component';

describe('PageEventoComponent', () => {
  let component: PageEventoComponent;
  let fixture: ComponentFixture<PageEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
