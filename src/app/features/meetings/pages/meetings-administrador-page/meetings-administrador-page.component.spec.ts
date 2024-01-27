import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsAdministradorPageComponent } from './meetings-administrador-page.component';

describe('MeetingsAdministradorPageComponent', () => {
  let component: MeetingsAdministradorPageComponent;
  let fixture: ComponentFixture<MeetingsAdministradorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsAdministradorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsAdministradorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
