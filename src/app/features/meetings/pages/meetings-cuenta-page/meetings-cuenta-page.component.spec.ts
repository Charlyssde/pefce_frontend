import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsCuentaPageComponent } from './meetings-cuenta-page.component';

describe('MeetingsCuentaPageComponent', () => {
  let component: MeetingsCuentaPageComponent;
  let fixture: ComponentFixture<MeetingsCuentaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsCuentaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsCuentaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
