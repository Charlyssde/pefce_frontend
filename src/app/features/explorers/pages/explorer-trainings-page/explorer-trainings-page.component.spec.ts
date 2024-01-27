import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerTrainingsPageComponent } from './explorer-trainings-page.component';

describe('ExplorerTrainingsPageComponent', () => {
  let component: ExplorerTrainingsPageComponent;
  let fixture: ComponentFixture<ExplorerTrainingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerTrainingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerTrainingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
