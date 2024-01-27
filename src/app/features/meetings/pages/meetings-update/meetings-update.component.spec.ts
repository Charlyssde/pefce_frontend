import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsCuentaEditComponent } from './meetings-update.component';

describe('MeetingsCuentaEditComponent', () => {
  let component: MeetingsCuentaEditComponent;
  let fixture: ComponentFixture<MeetingsCuentaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsCuentaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsCuentaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
