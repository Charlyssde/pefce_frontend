import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgendaComponent } from './show-agenda.component';

describe('ShowAgendaComponent', () => {
  let component: ShowAgendaComponent;
  let fixture: ComponentFixture<ShowAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
