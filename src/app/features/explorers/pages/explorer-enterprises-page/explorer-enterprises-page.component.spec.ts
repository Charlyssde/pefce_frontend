import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerEnterprisesPageComponent } from './explorer-enterprises-page.component';

describe('ExplorerEnterprisesPageComponent', () => {
  let component: ExplorerEnterprisesPageComponent;
  let fixture: ComponentFixture<ExplorerEnterprisesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerEnterprisesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerEnterprisesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
