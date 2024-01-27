import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTemaComponent } from './update-tema.component';

describe('UpdateTemaComponent', () => {
  let component: UpdateTemaComponent;
  let fixture: ComponentFixture<UpdateTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
