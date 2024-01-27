import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesModalComponent } from './reportes-modal.component';

describe('ReportesModalComponent', () => {
  let component: ReportesModalComponent;
  let fixture: ComponentFixture<ReportesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
