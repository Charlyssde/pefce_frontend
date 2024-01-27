import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseProductPageComponent } from './enterprise-product-page.component';

describe('EnterpriseProductPageComponent', () => {
  let component: EnterpriseProductPageComponent;
  let fixture: ComponentFixture<EnterpriseProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
