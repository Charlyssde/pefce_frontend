import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreguntaComponent } from './page-pregunta.component';

describe('PagePreguntaComponent', () => {
  let component: PagePreguntaComponent;
  let fixture: ComponentFixture<PagePreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
