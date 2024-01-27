import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePlantillaComponent } from './page-plantilla.component';

describe('PagePlantillaComponent', () => {
  let component: PagePlantillaComponent;
  let fixture: ComponentFixture<PagePlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
