import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprisesUpdateComponent } from './enterprises-update.component';

describe('EnterprisesUpdateComponent', () => {
  let component: EnterprisesUpdateComponent;
  let fixture: ComponentFixture<EnterprisesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterprisesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterprisesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
