import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseContactsUpdateComponent } from './enterprise-contacts-update.component';

describe('EnterpriseContactsUpdateComponent', () => {
  let component: EnterpriseContactsUpdateComponent;
  let fixture: ComponentFixture<EnterpriseContactsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseContactsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseContactsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
