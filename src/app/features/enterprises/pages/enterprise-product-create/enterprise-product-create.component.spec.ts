import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseProductCreateComponent } from './enterprise-product-create.component';

describe('EnterpriseProductCreateComponent', () => {
  let component: EnterpriseProductCreateComponent;
  let fixture: ComponentFixture<EnterpriseProductCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseProductCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
