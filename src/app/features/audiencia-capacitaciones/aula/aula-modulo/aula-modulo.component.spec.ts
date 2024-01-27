import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaModuloComponent } from './aula-modulo.component';

describe('AulaModuloComponent', () => {
  let component: AulaModuloComponent;
  let fixture: ComponentFixture<AulaModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulaModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
