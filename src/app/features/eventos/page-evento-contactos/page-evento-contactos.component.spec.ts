import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEventoContactosComponent } from './page-evento-contactos.component';

describe('PageEventoContactosComponent', () => {
  let component: PageEventoContactosComponent;
  let fixture: ComponentFixture<PageEventoContactosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEventoContactosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEventoContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
