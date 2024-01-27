import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerEnterprisesStandComponent } from './explorer-enterprises-stand.component';

describe('ExplorerEnterprisesStandComponent', () => {
  let component: ExplorerEnterprisesStandComponent;
  let fixture: ComponentFixture<ExplorerEnterprisesStandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerEnterprisesStandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerEnterprisesStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
