import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesOrganizationPageComponent } from './profiles-organization-page.component';

describe('ProfilesOrganizationPageComponent', () => {
  let component: ProfilesOrganizationPageComponent;
  let fixture: ComponentFixture<ProfilesOrganizationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesOrganizationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesOrganizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
