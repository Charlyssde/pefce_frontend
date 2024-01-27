import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlantillaComponent } from './update-plantilla.component';

describe('UpdatePlantillaComponent', () => {
  let component: UpdatePlantillaComponent;
  let fixture: ComponentFixture<UpdatePlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
