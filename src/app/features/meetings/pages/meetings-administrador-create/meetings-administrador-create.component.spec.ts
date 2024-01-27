import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsAdministradorCreateComponent } from './meetings-administrador-create.component';

describe('MeetingsAdministradorCreateComponent', () => {
  let component: MeetingsAdministradorCreateComponent;
  let fixture: ComponentFixture<MeetingsAdministradorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsAdministradorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsAdministradorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
