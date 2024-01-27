import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsAdministradorUpdateComponent } from './meetings-administrador-update.component';

describe('MeetingsAdministradorEditComponent', () => {
  let component: MeetingsAdministradorUpdateComponent;
  let fixture: ComponentFixture<MeetingsAdministradorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsAdministradorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsAdministradorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
