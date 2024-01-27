import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerEventsPageComponent } from './explorer-events-page.component';

describe('ExplorerEventsPageComponent', () => {
  let component: ExplorerEventsPageComponent;
  let fixture: ComponentFixture<ExplorerEventsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerEventsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
