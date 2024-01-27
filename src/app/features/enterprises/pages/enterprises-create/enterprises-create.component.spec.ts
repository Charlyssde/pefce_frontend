import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprisesCreateComponent } from './enterprises-create.component';

describe('EnterprisesCreateComponent', () => {
  let component: EnterprisesCreateComponent;
  let fixture: ComponentFixture<EnterprisesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterprisesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterprisesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
