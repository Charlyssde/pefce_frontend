import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseProductUpdateComponent } from './enterprise-product-update.component';

describe('EnterpriseProductUpdateComponent', () => {
  let component: EnterpriseProductUpdateComponent;
  let fixture: ComponentFixture<EnterpriseProductUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseProductUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
