import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseContactsCreateComponent } from './enterprise-contacts-create.component';

describe('EnterpriseContactsCreateComponent', () => {
  let component: EnterpriseContactsCreateComponent;
  let fixture: ComponentFixture<EnterpriseContactsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseContactsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseContactsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
