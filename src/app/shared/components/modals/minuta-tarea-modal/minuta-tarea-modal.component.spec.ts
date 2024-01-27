import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutaTareaModalComponent } from './minuta-tarea-modal.component';

describe('MinutaTareaModalComponent', () => {
  let component: MinutaTareaModalComponent;
  let fixture: ComponentFixture<MinutaTareaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutaTareaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutaTareaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
