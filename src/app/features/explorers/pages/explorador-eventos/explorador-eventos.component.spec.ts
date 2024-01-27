import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploradorEventosComponent } from './explorador-eventos.component';

describe('ExploradorEventosComponent', () => {
  let component: ExploradorEventosComponent;
  let fixture: ComponentFixture<ExploradorEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploradorEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploradorEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
