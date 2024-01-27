import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaTemaComponent } from './aula-tema.component';

describe('AulaTemaComponent', () => {
  let component: AulaTemaComponent;
  let fixture: ComponentFixture<AulaTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
