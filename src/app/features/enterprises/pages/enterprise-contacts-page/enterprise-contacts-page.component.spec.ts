import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseContactsPageComponent } from './enterprise-contacts-page.component';

describe('EnterpriseContactsPageComponent', () => {
  let component: EnterpriseContactsPageComponent;
  let fixture: ComponentFixture<EnterpriseContactsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseContactsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseContactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
