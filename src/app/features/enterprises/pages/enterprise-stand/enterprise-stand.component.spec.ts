import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseStandComponent } from './enterprise-stand.component';

describe('EnterpriseStandComponent', () => {
  let component: EnterpriseStandComponent;
  let fixture: ComponentFixture<EnterpriseStandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseStandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
