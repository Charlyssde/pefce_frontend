import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSectoresComponent } from './catalogo-sectores.component';

describe('CatalogoSectoresComponent', () => {
  let component: CatalogoSectoresComponent;
  let fixture: ComponentFixture<CatalogoSectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoSectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoSectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
