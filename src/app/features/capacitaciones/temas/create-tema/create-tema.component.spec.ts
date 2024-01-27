import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemaComponent } from './create-tema.component';

describe('CreateTemaComponent', () => {
  let component: CreateTemaComponent;
  let fixture: ComponentFixture<CreateTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
