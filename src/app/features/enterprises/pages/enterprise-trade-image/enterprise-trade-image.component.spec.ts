import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseTradeImageComponent } from './enterprise-trade-image.component';

describe('EnterpriseTradeImageComponent', () => {
  let component: EnterpriseTradeImageComponent;
  let fixture: ComponentFixture<EnterpriseTradeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseTradeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseTradeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
