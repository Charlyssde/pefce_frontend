import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterprisesPageComponent } from './enterprises-page.component';

describe('EnterprisesPageComponent', () => {
  let component: EnterprisesPageComponent;
  let fixture: ComponentFixture<EnterprisesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterprisesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterprisesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
