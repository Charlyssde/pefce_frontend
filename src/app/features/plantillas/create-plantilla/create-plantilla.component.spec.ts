import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlantillaComponent } from './create-plantilla.component';

describe('CreatePlantillaComponent', () => {
  let component: CreatePlantillaComponent;
  let fixture: ComponentFixture<CreatePlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
